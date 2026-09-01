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

        stage('Build Verification') {
            steps {
                echo 'Docker images built successfully.'
                sh 'docker images | grep agritrace'
            }
        }
    }

    post {
        success {
            echo 'AgriTrace CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'AgriTrace CI/CD Pipeline failed.'
        }
    }
}
