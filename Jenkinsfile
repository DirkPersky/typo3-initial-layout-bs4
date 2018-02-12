pipeline {
  agent any
  environment {
    HOST = 'ftp.gutenberghaus.de'
    USER = '{$USER}'
    PASSWD = '{$PASSWD}'
    DIR = '/htdocs/fileadmin'
    PROJEKT = '{$PROJEKT}'
    DEPLOY_TO = 'dev'
  }
  stages {
    stage('NPM Init') {
      parallel {
        stage('NPM Version') {
          steps {
            sh 'npm -v'
          }
        }
        stage('NPM Install') {
          steps {
            sh 'npm set progress=false && npm i --no-optional'
          }
        }
      }
    }
    stage('Deploy') {
        parallel {
            stage('Deploy Prod') {
                when {
                    environment name: 'DEPLOY_TO', value: 'prod'
                }
                steps {
                    sh 'npm run prod'
                }
            }
            stage('Deploy Dev') {
                when {
                    environment name: 'DEPLOY_TO', value: 'dev'
                }
                steps {
                    sh 'npm run dev'
                }
            }
        }
    }
    stage('Update') {
      steps {
        sh 'find ./app -type f -exec sed -i -e "s/Mysite4\\/app/$PROJEKT/" {} \\;'
      }
    }
    stage('Delivery') {
      steps {
        sh '''ncftp -u $USER -p $PASSWD $HOST <<EOF
                cd $DIR
                mkdir $PROJEKT
                cd $PROJEKT
                put -R -f ./app/*
                quit
                exit;
                EOF'''
      }
    }
    stage('Clear') {
      steps {
        cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, deleteDirs: true, cleanupMatrixParent: true)
      }
    }
  }
  post {
    success {
      echo 'ShareUrLoc-Client is Deployed'
    }
    failure {
      echo 'This will run only if failed'
    }
    changed {
      echo 'ShareUrLoc-Client Status of Build changed'
    }
  }
}
