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

  }
}