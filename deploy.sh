#!/bin/sh
# cloud SDK has to be installed and configured first
gcloud builds submit . --config=cloudbuild.yaml