# Datasets

## Downloading Datasets
*   FER2013 can be downloaded on [Kaggle](https://www.kaggle.com/c/challenges-in-representation-learning-facial-expression-recognition-challenge/data)
*   CK+ can be downloaded from [CMU](http://www.consortium.ri.cmu.edu/ckagree/)
*   JAFFE can be downloaded from [zenodo](https://zenodo.org/record/3451524)

## Format / Directory Structure
Because of the way Keras' flow_from_directory() function works, our code expects all images to live in the following folder structure. However, they can be in any format and resolution, as they will automatically be resized and recolored to fit as input to our models.

```bash
$ ls -1
0 angry
1 disgust
2 fear
3 happy
4 sad
5 surprise
6 neutral
```

## Preprocessing datasets
The Jupyter notebooks here can be used to preprocess the datasets into the format our code expects.
