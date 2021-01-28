### Deployment (CI/CD with Jenkins, Docker, and GCR)
In Google Cloud project
    > Sidebar > IAM & Admin > Service Credentials
    > Create Service Account > Fill out as desired
    > Click on newly created Service Account > Add a new key and dowload to local machine
    > Sidebar > Click Storage > Open Item > Permissions > Add
    > Insert email associated with the service account (jenkins@vattenlada.iam.gserviceaccount.com) and choose a role
    > Save

In Jenkins, must ensure following plugins have been installed
    > Google Container Registry Auth
    > docker-build-step	