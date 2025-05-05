import pandas as pd
import numpy as np

rng = np.random.default_rng()

def assign_balanced_partitions(df, group_columns):
    """
    Assign balanced partitions to a DataFrame (in 'partition_group' column) while ensuring:
    - Each partition has at least `min_items`.
    - No partition has more than `min_items + 1`.
    """
    # Shuffle the DataFrame for randomness
    df = df.sample(frac=1, random_state=42).reset_index(drop=True)
    df["partition_group"] = -1 # for debugging reasons
    min_items = len(df)

    groups = df.groupby(group_columns)

    i = 0
    curr_i = 0 
    for _, group in groups:
        group_indices = group.index
        group_partition = [] 
        while i < len(group_indices):
            group_partition.append(curr_i % SPLITS)
            i += 1
            curr_i += 1

        i = 0
        df.loc[group_indices, "partition_group"] = group_partition

    
    return df


tests = [
    "ggr-mc", # 13 items
    "vlat", # 53 items
    "calvi", # 4515=60 items
    "brbf", # 36+36=72 items
    "wainer" # 32 items
]
SPLITS = 5

def fetch_all_tests(tests):
    test_dfs = []
    test_order = list(range(len(tests)))
    rng.shuffle(test_order)

    for i, test in enumerate(tests):
        test_df = pd.read_csv(f"https://data-visualization-benchmark.s3.us-west-2.amazonaws.com/{test}/questions.csv")
        test_df = test_df.rename(columns={'graph_type': 'chart_type'})
        test_df['text_input_type'] = 'multiple_choice_question'
        test_df['test_type'] = str(i) + "_" + test

        # assugb random categories to charts
        test_charts = test_df['chart_type'].unique()
        chart_code_map = dict(
            zip(test_charts, rng.permutation(range(0, len(test_charts))))
        )
        test_df['chart_type'] = test_df['chart_type'].apply(lambda c : str(chart_code_map[c]) + c)

        test_tasks = test_df['task_category'].unique()
        task_code_map = dict(
            zip(test_tasks, rng.permutation(range(0, len(test_tasks))))
        )
        test_df['task_category'] = test_df['task_category'].apply(lambda t : str(task_code_map[t]) + t)

        if test == "calvi":
            test_df['test_type'] = test_df.apply(lambda r : r['test_type'] + "*" + r['image_file'][0] + "*" + r['chart_type'] + "*" + r['task_category'], axis=1)
            test_df['chart_type'] = test_df.apply(lambda r : r['image_file'][0] + "-" + r['chart_type'], axis=1)

        if test == 'brbf':
            test_df['test_type'] =  test_df['test_type'] + '*' + test_df['chart_type']
            # test_df['image_file'].apply(lambda c : ''.join(c.split(".")[0].split('-')[:-1]))

        if test in ['wainer', 'ggr-mc', 'vlat']:
            test_df['test_type'] = test_df['test_type'] + '*' + test_df['chart_type'] + '*' + test_df['task_category']
        
        test_dfs.append(test_df)
        
    test_dfs = pd.concat(test_dfs).reset_index(drop=True)

    # influence how questions are distributed
    test_dfs['random_tie_breaker'] = np.random.rand(len(test_dfs))
    test_dfs = test_dfs.sort_values(by=["test_type", "random_tie_breaker"]).reset_index(drop=True)
    test_dfs = test_dfs.drop(columns=['random_tie_breaker'])

    # For WAINER test
    # make sure wainer only unique questions show up
    # works since we have 8 unique questions and 5 SPLITS
    wainer_mask = test_dfs['test_type'].apply(lambda t : t.find('wainer') != -1)
    # get all questions in wainer, arranged the {SPLITS}/N-th question is unique
    wainer_question_order = rng.permutation(test_dfs[wainer_mask]['question'].unique()) 
    wainer_df = test_dfs[wainer_mask].copy()
    wainer_df['question'] = pd.Categorical(wainer_df['question'], categories=wainer_question_order, ordered=True)
    wainer_df = wainer_df.sort_values(by=['test_type', 'question'])
    wainer_df.index = test_dfs[wainer_mask].index
    # shuffle so everything is unique
    test_dfs.loc[test_dfs[wainer_mask].index] = wainer_df

    # For BRBF test
    brbf_mask = test_dfs['test_type'].apply(lambda t : 'brbf' in t)
    brbf_task_order = rng.permutation(test_dfs[brbf_mask]['task_category'].unique())
    brbf_df = test_dfs[brbf_mask].copy()
    brbf_df['task_category'] = pd.Categorical(brbf_df['task_category'], categories=brbf_task_order, ordered=True)
    brbf_df = brbf_df.sort_values(by=['test_type', 'task_category'])
    brbf_df.index = test_dfs[brbf_mask].index
    test_dfs.loc[test_dfs[brbf_mask].index] = brbf_df

    return test_dfs



def create_data():

    combined_df = fetch_all_tests(tests = [
        "ggr-mc",
        "vlat", 
        "calvi",
        "brbf",
        'wainer'
    ])

    new_rows = []
    for i, row in combined_df.iterrows():
        partition_group = i % SPLITS
        row['partition_group'] = partition_group
        new_rows.append(row.to_dict())

    partitioned_df = pd.DataFrame(new_rows)

    def shuffle_tests(g):
        test_types = g['test_type'].apply(lambda t : t.split("*")[0]).unique()
        new_test_types = rng.permutation(test_types)
        new_test_dict = { test : str(i)  for i, test in enumerate(new_test_types)}
        
        g['test_type'] = g['test_type'].apply(
            lambda t : new_test_dict[t.split("*")[0]] + t[1:]
        )
        

        #unique test types
        # test_type_order = {test :  for i, test in enumerate(test_types)}
        
        # g['test_type'] = g['test_type'].apply(lambda )
        
        # g = g.sort_values(by='test_type')
        return g

    # shuffle tests
    partitioned_df = partitioned_df.groupby(by=['partition_group']).apply(shuffle_tests).reset_index(drop=True)

    # influeces how questions are save
    partitioned_df = partitioned_df.sort_values(by=['partition_group', 'test_type'])
    print(partitioned_df['test_type'].unique())
    partitioned_df['test_type'] = partitioned_df['test_type'].apply(lambda t : t.split("*")[0])

    return partitioned_df

    # new_rows.groupby("partition").apply(lambda g : print(g.iloc[0]['partition_group'], g[['test_type']].value_counts(), "\n"))
    # partitioned_df.groupby("partition_group").apply(lambda g : print(g[g['test_type'].apply(lambda t : t.find('wainer') != -1)][['question']].nunique(), "\n"))

experiment_df = []
for seed in range(85):
    partitioned_df = create_data()
    partitioned_df['seed'] = seed + 15
    # each seed has 5 splits
    partitioned_df['participant_cond_id'] = partitioned_df['seed'] * SPLITS
    partitioned_df['participant_cond_id'] = partitioned_df['participant_cond_id'] + partitioned_df['partition_group']
    

    experiment_df.append(partitioned_df)

pd.concat(experiment_df).to_csv("./experiments.csv")