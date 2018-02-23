pipeline {
  agent any
  environment {
    HOST = 'ftp.gutenberghaus.de'
    USER = '{$USER}'
    PASSWD = '{$PASSWD}'
    DIR = '/htdocs/fileadmin'
    PROJEKT = '{$PROJEKT}'
    DEPLOY_TO =
    FORCE_INSTALL = 'false'
  }
  stages {
    stage('NPM Init') {
      parallel {
        stage('NPM Version') {
          steps {
            sh 'npm -v'
          }
        }
        stage('get caches NPM Dir') {
          steps {
            sh '[ -d "../../../cache/$PROJEKT" ] && mv ../../../cache/$PROJEKT node_modules/ || echo "Folder Not Exist"'
          }
        }
      }
    }
    stage('NPM Install/Update') {
        parallel {
            stage('NPM Install'){
                when {
                    environment name: 'FORCE_INSTALL', value: 'true'
                }
                steps {
                    sh 'npm set progress=false && npm install --no-optional'
                }
            }
            stage('NPM Update'){
                when {
                    environment name: 'FORCE_INSTALL', value: 'false'
                }
                steps {
                    sh '[ ! -d "./node_modules" ] && npm set progress=false && npm install --no-optional || echo "Update skipped"'
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
        parallel {
            stage('Clear Prod') {
                when {
                    environment name: 'DEPLOY_TO', value: 'prod'
                }
                steps {
                   cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, deleteDirs: true, cleanupMatrixParent: true)
               }
            }
            stage('Clear Dev') {
                when {
                    environment name: 'DEPLOY_TO', value: 'dev'
                }
                steps {
                    sh '[ ! -d "../../../cache/$PROJEKT" ] && mv node_modules/ ../../../cache/$PROJEKT || echo "Folder Exist cant move"'
                    cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, deleteDirs: true, cleanupMatrixParent: true)
                }
            }
        }
    }
  }
  post {
    success {
      echo 'Client is Deployed'
    }
    failure {
      echo 'This will run only if failed'
    }
    changed {
      echo 'Client Status of Build changed'
    }
  }
}
