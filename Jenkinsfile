pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling AgriTrace source code...'
                checkout scm
            }
        }

        stage('Check Docker') {
            steps {
                sh 'docker --version'
                sh 'docker-compose --version'
            }
        }

        stage('Build') {
            steps {
                echo 'Building AgriTrace Docker images...'
                sh 'docker-compose build'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying AgriTrace...'
                sh 'docker-compose up -d'
            }
        }

        stage('Verify') {
            steps {
                sh 'docker-compose ps'
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 10
                    curl -f http://host.docker.internal/health
                '''
            }
        }
    }

    post {
        success {
            echo 'AgriTrace CI/CD completed successfully!'
        }

        failure {
            echo 'AgriTrace CI/CD failed. Check Console Output.'
        }
    }
}