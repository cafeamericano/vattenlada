pipeline {
  agent any
  stages {

    // STARTING ////////////////////////////////////////////////////////////////////////////////////////////

    /* Print something to the console */
    stage('Say Hello') {
      steps {
        echo 'Hello world!'
      }
    }

    // BUILDING ////////////////////////////////////////////////////////////////////////////////////////////

    /* Build the Docker image */
    stage('Build') {
      steps {
        sh 'docker build -t vattenlada-api:latest .'
      }
    }

    // TAGGING ////////////////////////////////////////////////////////////////////////////////////////////

    /* Tag image for Google Cloud Registry */
    // stage('Tag for GCR') {
    //   steps {
    //     sh 'docker tag vattenlada-api mfarmer5102/vattenlada-api'
    //   }
    // }

    // PUSHING ////////////////////////////////////////////////////////////////////////////////////////////

    /* Push image to Google Container Registry */
    // stage('Push to GCR') {
    //   steps {
    //     script {
    //       docker.withRegistry('https://gcr.io', 'gcr:Vattenlada') {
    //         def customImage = docker.build("mfarmer5102/vattenlada-api:latest")
    //         customImage.push()
    //       }
    //     }
    //   }
    // }

    /* Push the image to Docker Hub */
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