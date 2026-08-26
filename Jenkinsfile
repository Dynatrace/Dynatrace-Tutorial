pipeline {
  agent {
    docker {
      image 'node:22'
    }
  }

  stages {
    stage('Install') {
      steps {
        sh('npm ci')
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Build') {
      steps {
        sh('npm run build')
      }
    }

    stage('Deploy') {
      steps {
        sh('npx dt-app deploy')
      }
    }
  }
}