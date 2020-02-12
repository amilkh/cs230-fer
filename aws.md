## Connect to AWS Server
- Go to the folder with key and `chmod 400 cs230_aws_key.pem`
- `ssh -i "cs230_aws_key.pem" ubuntu@ec2-54-245-150-192.us-west-2.compute.amazonaws.com`
- `source activate tensorflow_p36`

## Start jupyter notebook on server
- On server: `jupyter notebook --no-browser --port=8888 --ip='*' --NotebookApp.token='' --NotebookApp.password=''`
- On local laptop: `ssh -i "cs230_aws_key.pem" -NL 8888:localhost:8888 ubuntu@ec2-54-245-150-192.us-west-2.compute.amazonaws.com`
- Go to `localhost:8888` on your local machine and you should be able to run notebook


## (Optional) Start new session on server
- Start a new session from terminal: `screen -S section`
- How to resume a session: `screen -r section`