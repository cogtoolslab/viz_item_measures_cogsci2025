# Measuring and predicting variation in the difficulty of questions about data visualizations

This repository contains code to reproduce the results in our CogSci 2025 paper, [*Measuring and predicting variation in the difficulty of questions about data visualizations*](/paper/vlm_datavis_benchmark_corrected_cogsci2024.pdf).

Directory Structure

```bash
├── admin
├── analysis
├── data
├── experiments
│   ├── api  
│   ├── frontend
├── paper
├── results
│   ├── dataframe
│   ├── figures
├── stimuli
```

Each folder contains a README.md file that elaborates further on its contents. Below are the general descriptions of each folder:

`admin` contains contributions.md which describes author contributions

`analysis` contains all python scripts and notebooks used to  calculate statistics and generate figures reported in the paper.

`data` contains instructions on how to download the data model and human responses to all items.

`experiments` contains the server api code used to save model responses during evaluations and the code to evaluate vision-language models. 

`paper` contains the pdfs for the orginial and corrected version our paper.

`results` contains the dataframes (csv files) and unedited figures for all plots in the paper.

`stimuli` contains the test items and instructions given to humans and machines.

BibTeX Citation:
```
@inproceedings{verma2025evaluating,
  title={Measuring and predicting variation in the difficulty of questions about data visualizations},
  author={Verma, Arnav and Fan, Judith E},
  booktitle={Proceedings of the Annual Meeting of the Cognitive Science Society},
  volume={47},
  year={2025}
}
```
