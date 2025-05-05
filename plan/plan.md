# Consistency and variation across measures of data visualization literacy
 
**Researchers**: Arnav Verma, Judith Fan
 
## Study information

### Background 

Existing measures of data visualization literacy involve assessments consisting of questions where the answer can be obtained by completing a task, such as retrieving a value, using an image of a data visualization. However, it is unclear to what degree individual questions or groups of questions reliably measure the same underlying skills. Furthermore, it is unclear whether all assessments break visualization literacy into the same, or even a subset of the same, common skills.

To address these issues, we measure participants' responses on five different assessments and investigate the variability in item performance based of different heuristic features. We also apply Probabilistic Matrix Facotrization to the resulting error patterns to decompose all assessments into a common set of latent factors. By analyzing which types of items map onto the same latent factors, we will be able to identify whether one item requires a different set of skills to complete correctly than another item. This may also allow us to draw inferences about which graphs and tasks require a similar set of skills to answer correctly.

 
### Research questions

1. **To what degree do different tests of data visualization literacy measure the same underlying components?**

 
## Design Plan
###   Study type

Correlational

###  Study design
<!-- describe the overall design of the study (what will be manipulated and/or measured, specify whether manipulations will be between- or within-participants, etc.)-->
 
#### Stimuli 
 
We assess participants on 230 multiple-choice items sampled from five assessments data visualization literacy. Each item consists of (1) an image of a data visualization or a table alongside (2) a question which should be answered by using information in the image. Items are further categorized using three common categories: *task type*, the type reasoning steps performed by a participant to answer a question; *graph type*, how the image encodes data to visual features; and *modality* whether the image presents data in a tabular format or using a data visualization.

**Wainer** The first test, which we call Wainer, was developed to evaluate children at the third- to fifth-grade level in the United State (Wainer, 1980) and includes 32 items. It uses six questions each categorized as a different task type. All six questions are asked across one table and three unique graphs of a line chart, bar chart, and a polar plot, a type of pie chart. 

**GGR** The second test, which we call GGR, is a widely used 13-item assessment comprising three bar plots, three line plots, an icon array, and a pie chart (Galesic & Garcia-Retamero, 2011). The test was designed to explore a compact hierarchy of abstract abilities, progressing from "reading the data" to "reading between the data" to "reading beyond the data." Originally, nine of the test items required a numerical response, and four were multiple choice. However, to maintain consistency with other assessment items, we converted the numerical questions into a multiple-choice format by selecting the top four most frequent responses based on a prior study (Brockbank et al., 2025).

**BRBF** The fourth test, which we call BRBF (Boy et al., 2014), consists of 60 bar chart images, 60 scatter plot images, 120 line graph images, 48 tables. All items were categorized by six task types: maximum extrema, minimum extrema, intersection, variation, average, and comparison. Each combination of task and graph type includes atleast two unique questions, five images of charts, and one image of a table. We create a subset of 48 items representing each unique question, task type, and graph type combination used in the assessment to reduce to total number of items while maintaing items across different categories mentioned in the test.

**VLAT** The Visualization Literacy Assessment Test (VLAT) is an influential 53-item assessment containing 12 chart images (Lee et al., 2016) generated from unique real-world data sources, each of a unique graph type:  line chart, bar chart, stacked bar chart, normalized stacked bar chart, pie chart, histogram, scatter plot, bubble chart, area chart, stacked area chart, choropleth map, and tree map. It also groups question into 6 task types: retrieving values, finding extrema, finding anomalies, making comparisons, determining ranges, finding correlations & trends, and finding clusters. 

**CALVI** The Critical Thinking Assessment for Literacy in Visualizations (CALVI), is a 60-item test assessment that contains 45 trick items and 15 standard items (Ge et al., 2023). It follows the design of VLAT, consisting of a subset of tasks types: retrieve value, find trends & correlations, find extremum, make comparisons, make predictions, aggregate values; and a subset of graph types: line chart, bar chart, stacked bar chart, normalized stacked bar chart, pie chart, scatter plot, area chart, stacked area chart, and choropleth map. It also groups question into 6 task types: retrieving values, finding extrema, finding anomalies, making comparisons, determining ranges, finding correlations and trends, and finding clusters. 

Since each assessment uses different labels for similar tasks, we re-group all items into three common *task types*:
- *value identification*: items where participants need to retrieve an individual value appearing in a plot
- *arithmetic computation*: items where participants are expected to perform arithmetic operations over multiple values displayed in the plot
- *statistical inference*: items where participants are required to estimate latent parameters based on the values shown (e.g., judge the strength of trends or presence of clusters)

#### Task procedure

We evalulate all participants on items from all six assessments. Since answering all 230 items in a continous session may lead to mental fatigue, we assign every participant a subset consisting of 46 item (20% of the total stimuli set) stratifying within tests, graph types, and task types. Each partcipiant is additionally given five practice items at the start of the study, consisting of fourth-grade math problem sample from The Nation's Report Card assessment items. These items must be sucessfuly answered in sucession in order to progress to the main study and must start over upon failing one. 

Items from the same assessment are presented in blocks, with participants being given 60 seconds to answer every item, with an untimed break after every block. Upon submitting a response, a message revals the correctness of their response.

###   Measured variables
For each trial we record: 
- Selected responses: A list all choices which were selected during the trial, including the timestamp of when they were selected.
- Response time: the amount of time it takes a participant to respond to each item starting from when they first landed on the new webpage to when they clicked the submit button.

After all trials are completed, we futher collect information on: 
- Highest academic degree attained: None, High school diploma, Some college, Bachelor's degree in Arts (Non-STEM), Bachelor's degree in STEM, Master's degree in Arts (Non-STEM), Master's degree in STEM, Professional Degree (D.D.S., M.D., J.D., etc.), Doctorate (Ph.D., Ed.D., etc.)
- Previously completed courses in Mathematics: Algebra , Geometry , Trigonometry , Precalculus , Calculus , Multivariable Calculus , Differential Equations , Linear Algebra , Probability and Statistics , Computer Programming , Real Analysis , Data Science , None of the above
- Comfort level on reading graphs: Not comfortable, Somewhat comfortable, Comfortable, Very comfortable
- Color vision deficiency: Yes or No
- Written feedback on the experiment

## Sampling Plan
###   Data collection procedure

We plan to recruit participants through the Prolific crowdsourcing platform. Participants will be recruited from the United States, are required to speak English as their primary language, and must have a Prolific approval rate of 95%.
 
###   Sampling procedure 
The target sample size will be 400 participants, maximizing the number of participants recruited with the resources available and allowing us to obtain 80 responses for each item in the stimuli set. Data collection will stop once the planned number of participants has been reached.

<!-- indicate your target sample size and why that is your target (might be based in past research, for example) -->
<!-- ###   Stopping rule -->
<!-- specify how you will determine when to stop data collection -->

## Analysis Plan
###  Data exclusion criteria
<!-- How will you determine which data points or samples (if any) to exclude from your analyses? How will outliers be handled? Will you use any awareness or attention check? -->

Data from participants who do not complete at least 80% of the items in each session will be excluded. In addition, data from participants will be excluded if they provide responses in the post-study questionnaire that clearly appear to have been created with the use of large language model-based chatbots (e.g., ChatGPT).

###  Handling missing data

Data for participants who did not complete the final study will not be included in the initial planned analysis. We will conduct a follow-up exploratory analysis with a dataset that includes participants who completed at least half of the items in their session.

### Planned analyses

For all analyses, we use mixed-effects regression implemented in R using the `lme4` package. To evaluate competing models, we will use 5-fold cross-validation, stratifying folds across tests, graph types, and task types to preserve the nested structure of our data.

Our approach to statistical analysis will combine model comparison and parameter estimation. We will report both effect sizes and confidence intervals for key parameters of interest. Confidence intervals will generally be constructed using bootstrap resampling across items and participants, unless otherwise indicated.

##### 1. How does performance vary across tests?
To evaluate whether different *tests* (e.g. Wainer, GGR, BRBF, VLAT, and CALVI) lead to differences in performance, we will visualize point and interval estimates across *tests*, alongside a scatterplot representing the proportion of correct responses at the item level on each *test*. We will also compare a base model with item_id as a random effect to a model which also includes *test* as a fixed effect, shown by the model below.
```
base_model <- glmer(
    item_correct ~ 1 + (1 | item_id),
    family = "binomial",
    data = data
)

test_model <- glmer(
    item_correct ~ 1 + test_type + (1 | item_id),
    family = "binomial",
    data = data
)

anova(base_model, test_model)
```


##### 2. How does performance vary across different types of graphs?
To evaluate whether different *graph types* (e.g., bar chart, scatter plot, etc.) lead to differences in performance at the item level, we will visualize point and interval estimates across different *graph types*, alongside a scatterplot representing the proportion of correct responses at the item level on each *graph type*. 

It is possible that one test might consistently contain more difficult items involving a particular kind of *graph* than another test. To evaluate the degree to which there is systematic variation in performance across tests, even among items containing the same type of *graph*, we will compare a base model with item_id as a random effect to a model that also includes *graph type* as a fixed effect and its interaction with *test type*, as shown below.
```
base_model <- glmer(
    item_correct ~ 1 + (1 | item_id),
    family = "binomial",
    data = data
)

graph_model <- glmer(
    item_correct ~ 1 + graph_type * test_type + (1 | item_id),
    family = "binomial",
    data = data
)

anova(base_model, graph_model)
```

##### 3. How does performance vary across different kinds of tasks?
To evaluate whether different *task types* (e.g., value identification, arithmetic computation, statistical inference) lead to differences in performance at the item level, we will visualize point and interval estimates across different *task types*, alongside a scatterplot representing the proportion of correct responses at the item level on each *task type*.

It is possible that one test might consistently contain more difficult items involving a particular kind of *task* than another test. To evaluate the degree to which there is systematic variation in performance across tests, even among items containing the same type of *task*, we will compare a base model with item_id as a random effect to a model that also includes *task type* as a fixed effect and its interaction with *test type*, as shown below.
```
base_model <- glmer(
    item_correct ~ 1 + (1 | item_id),
    family = "binomial",
    data = data
)

task_model <- glmer(
    item_correct ~ 1 + task_type * test_type + (1 | item_id),
    family = "binomial",
    data = data
)

anova(base_model, task_model)
```


##### 4. How does performance vary across presentation modality (tables vs. plots)?
To evaluate whether different *modalities* (tables vs. data visualizations) lead to differences in performance at the item level, we will visualize point and interval estimates across different *modalities*, alongside a scatterplot representing the proportion of correct responses at the item level on each *modality*. We will also compare a base model with item_id as a random effect to a model which also includes *modality* as a fixed effect, as shown below.
```
base_model <- glmer(
    item_correct ~ 1 + (1 | item_id),
    family = "binomial",
    data = data
)

modality_model <- glmer(
    item_correct ~ 1 + modality_type + (1 | item_id),
    family = "binomial",
    data = data
)

anova(base_model, modality_model)
```

##### 5. What is the relationship between math experience and performance?
We will fit a logistic regression model to predict the probability of generating a correct response based on the number of formal math courses a participant has taken (a proxy for math experience). We will compare this model to a base model which accounts for participants and items as random effects using a Likelihood Ratio Test. 

```
base_model <- glmer(
    item_correct ~ 1 + (1 | participant_id),
    family = "binomial",
    data = data
)

math_course_model <- glmer(
    item_correct ~ 1 + math_course_count + (1 | participant_id),
    family = "binomial",
    data = test_data_derived
)

anova(base_model, math_course_model)
```

##### 6. What are the latent factors that best account for error patterns and how well aligned are they with existing ways of categorizing items?

To uncover latent structures that predict variation in item performance we use Probabilistic Matrix Factorization (PMF) with a Bernoulli distribution, modeling two matricies which recover participant error patterns (correct/incorrect) --- the loading matrix `L` (`N` * `k`) and the latent factor matrix (`k` * `I`), where `N` is total number of participants (expected to be 400); `I` is the total number of items (230 items); and `k` is the optimal number of factors which minimize the Bayesian Information Criterion (BIC) and lead to the best model fit. Since each participant completed ~20% of each assessment, PMF allows us to account for data sparcity with uncertaninty in predicted values.

We compare this latent factor model to idealized factor models based on item categories, including:
- Test (e.g., Wainer, GGR, BRBF, VLAT, CALVI)
- Modality type (table vs chart)
- Graph type (e.g., bar chart, scatter plot, etc.),
- Question type (e.g., retrieve value, find extremum, etc.)

In each idealized model, the loading matrix `L` encodes item groupings with respect to heauristic features (i.e. test type, modality type, graph type, task type). For example, the test type model would use a binary (230 x 5) matrix where each row represents an item, and columns indicate whether an item belongs to a given test (Wainer, GGR, BRBF, VLAT, CALVI). These models assume items within the same category share error patterns and are independent across categories.

Each model predicts responses for all items, and mean squared error (MSE) is calculated per participant. Group-level MSE (average participant MSE) summarizes the predictive proportion of correct responses.

For the latent factor model, we use five-fold cross-validation: the loading matrix L is fit on training folds, then used to predict responses for held-out folds, ensuring evaluation is based on independent data. This allows us to compare the latent model’s predictive proportion of correct responses to that of the idealized models and assess its ability to capture error patterns effectively.

We aim to evaluate the alignment between the latent factors discovered through PMF and the pre-defined heuristic features (e.g. test type, modality type, task type, and graph type). To do this, we will define a coherence score for each heuristic feature value. To compute the coherence score, we will compute the simpson's diversity index. We will normalize this index so that the coherence score ranges from 0 (items maximally dispersed across factors) to 1 (all items assigned to a single factor). 

To identify the relationship between different heuristic feature values we will construct a similarity matrix. This matrix will visualize pairwise similarities between heuristic feature values. Each value will be represented by a `k` vector of counts, reflecting how many items from a given feature belong to each factor. We will normalize this vector into a relative frequency distribution (i.e. such that all values sum to 1) and compute similarity scores between distributions using cosine similarity. 

