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
        sh 'docker tag vattenlada-api mfarmer5102/vattenlada-api'
      }
    }

    stage('Push to Docker Hub') {
      steps {
        script {
          docker.withRegistry('', 'Docker_Hub') {
            def customImage = docker.build("mfarmer5102/vattenlada-api:latest")
            customImage.push()
          }
        }
      }
    }

  }
}