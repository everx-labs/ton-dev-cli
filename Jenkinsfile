G_giturl = "git@github.com:tonlabs/ton-dev-cli.git"
G_gitcred = 'TonJenSSH'
pipeline {
    agent {
        docker {
            image 'node:10-buster' 
        }
    }
 
    stages {
        stage('publish to npm') { 
            when {
                expression {
                    GIT_BRANCH == 'master' 
                }
            }
            steps {    
                script {
                    ton_directory = "~/workdir/ton-dev-cli"
                    sh '[ -d ~/.ssh ] || mkdir -v ~/.ssh'
                    sh 'ssh-keyscan github.com >> ~/.ssh/known_hosts'
                    sshagent([G_gitcred]) {
                        sh """
                            rm -rf $ton_directory
                            mkdir -pv $ton_directory
                            git clone $G_giturl $ton_directory
                        """
                    }      
                    withCredentials([string(
                                credentialsId: 'npmJS_token',
                                variable: 'NPM_TOKEN')]) {
                        sh """
                            cd $ton_directory
                            echo //registry.npmjs.org/:_authToken=${env.NPM_TOKEN} > .npmrc
                            npm install
                            npm run babel
                            npm publish
                        """
                    }      
                }
            }
        }
    }
}