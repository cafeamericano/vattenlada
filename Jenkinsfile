pipeline {
  agent any
  stages {
    stage('Say Hello') {
      steps {
        echo 'Hello world!'
      }
    }

    stage('Build') {
      steps {
        sh 'docker build -t vattenlada-api:latest .'
      }
    }

    stage('Tag for GCR') {
      steps {
        sh 'docker tag vattenlada-api gcr.io/vattenlada/vattenlada-api'
      }
    }

    stage('Push to GCR') {
      steps {
        sh 'docker push gcr.io/vattenlada/vattenlada-api'
      }
    }

  }
}