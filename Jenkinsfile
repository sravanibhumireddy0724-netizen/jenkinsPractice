pipeline {
    agent any

    tools {
        maven 'Maven-3.9'
        jdk 'JDK_17'
    }

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['QA', 'dev', 'stage', 'Prod'], description: 'Select environment')
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Select browser')
        choice(name: 'TEST_SUITE', choices: ['all', 'smoke', 'regression', 'api-smoke'], description: 'Select test suite')
    }

    environment {
        SLACK_CHANNEL = '#new-channel'
    }

    options {
        timeout(time: 45, unit: 'MINUTES')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '20'))
        disableConcurrentBuilds()
    }

    stages {
        stage('Build') {
        steps {
        echo '========================================='
        echo '  Build Stage - No Maven / No Docker'
        echo '========================================='

        bat 'echo Build completed successfully'
    }
}

        stage('Checkout Playwright Framework') {
            steps {
                echo 'Checking out Playwright framework...'
                dir('qa-tests') {
                    git url: 'https://github.com/sravanibhumireddy0724-netizen/jenkinsPractice.git', branch: 'main'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node/Playwright dependencies...'
                dir('qa-tests') {
                    bat 'npm install'
                    bat 'npx playwright install'
                }
            }
        }

        stage('Selected Parameters') {
            steps {
                echo "Environment : ${params.ENVIRONMENT}"
                echo "Browser     : ${params.BROWSER}"
                echo "Test Suite  : ${params.TEST_SUITE}"
            }
        }

        stage('Deploy to DEV') {
            steps {
                echo 'Deploying to DEV... ✅'
                bat 'echo DEV deployment simulation completed'
            }
        }

        stage('DEV - Sanity Tests') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'dev-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD'),
                    string(credentialsId: 'api-token', variable: 'API_TOKEN'),
                    string(credentialsId: 'oauth-client-id', variable: 'OAUTH_CLIENT_ID'),
                    string(credentialsId: 'oauth-client-secret', variable: 'OAUTH_CLIENT_SECRET'),
                    string(credentialsId: 'dev-base-url', variable: 'BASE_URL'),
                    string(credentialsId: 'api-base-url', variable: 'API_BASE_URL')
                ]) {
                    dir('qa-tests') {
                        bat """
                            set CI=true
                            set ENV=dev
                            npx playwright test --project=${params.BROWSER} --grep @smoke
                        """
                    }
                }
            }
            post {
                always {
                    publishHTML(target: [
                        reportName: 'DEV - Playwright HTML Report',
                        reportDir: 'qa-tests/reports/html-report',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true,
                        allowMissing: true
                    ])
                }
            }
        }

        stage('Deploy to QA') {
            steps {
                echo 'Deploying to QA... ✅'
                bat 'echo QA deployment simulation completed'
            }
        }

        stage('QA - Regression Tests') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'qa-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD'),
                    string(credentialsId: 'api-token', variable: 'API_TOKEN'),
                    string(credentialsId: 'oauth-client-id', variable: 'OAUTH_CLIENT_ID'),
                    string(credentialsId: 'oauth-client-secret', variable: 'OAUTH_CLIENT_SECRET'),
                    string(credentialsId: 'qa-base-url', variable: 'BASE_URL'),
                    string(credentialsId: 'api-base-url', variable: 'API_BASE_URL')
                ]) {
                    dir('qa-tests') {
                        bat """
                            set CI=true
                            set ENV=qa
                            npx playwright test --project=${params.BROWSER}
                        """
                    }
                }
            }
            post {
                always {
                    publishHTML(target: [
                        reportName: 'QA - Playwright HTML Report',
                        reportDir: 'qa-tests/reports/html-report',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true,
                        allowMissing: true
                    ])
                }
            }
        }

        stage('Deploy to STAGE') {
            steps {
                echo 'Deploying to STAGE... ✅'
                bat 'echo STAGE deployment simulation completed'
            }
        }

        stage('STAGE - Sanity Tests') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'stage-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD'),
                    string(credentialsId: 'api-token', variable: 'API_TOKEN'),
                    string(credentialsId: 'oauth-client-id', variable: 'OAUTH_CLIENT_ID'),
                    string(credentialsId: 'oauth-client-secret', variable: 'OAUTH_CLIENT_SECRET'),
                    string(credentialsId: 'stage-base-url', variable: 'BASE_URL'),
                    string(credentialsId: 'api-base-url', variable: 'API_BASE_URL')
                ]) {
                    dir('qa-tests') {
                        bat """
                            set CI=true
                            set ENV=stage
                            npx playwright test --project=${params.BROWSER} --grep @smoke
                        """
                    }
                }
            }
            post {
                always {
                    publishHTML(target: [
                        reportName: 'STAGE - Playwright HTML Report',
                        reportDir: 'qa-tests/reports/html-report',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true,
                        allowMissing: true
                    ])
                }
            }
        }

        stage('Approval for PROD') {
            steps {
                input message: 'Deploy to PROD?', ok: 'Yes, Deploy!'
            }
        }

        stage('Deploy to PROD') {
            steps {
                echo 'Deploying to PROD... ✅'
                bat 'echo PROD deployment simulation completed'
            }
        }

        stage('PROD - Smoke Tests') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'prod-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD'),
                    string(credentialsId: 'api-token', variable: 'API_TOKEN'),
                    string(credentialsId: 'oauth-client-id', variable: 'OAUTH_CLIENT_ID'),
                    string(credentialsId: 'oauth-client-secret', variable: 'OAUTH_CLIENT_SECRET'),
                    string(credentialsId: 'prod-base-url', variable: 'BASE_URL'),
                    string(credentialsId: 'api-base-url', variable: 'API_BASE_URL')
                ]) {
                    dir('qa-tests') {
                        bat """
                            set CI=true
                            set ENV=prod
                            npx playwright test --project=${params.BROWSER} --grep @smoke
                        """
                    }
                }
            }
            post {
                always {
                    publishHTML(target: [
                        reportName: 'PROD - Playwright HTML Report',
                        reportDir: 'qa-tests/reports/html-report',
                        reportFiles: 'index.html',
                        keepAll: true,
                        alwaysLinkToLastBuild: true,
                        allowMissing: true
                    ])
                }
            }
        }
    }

    post {
        always {
            script {
                def buildStatus = currentBuild.currentResult
                def statusEmoji = buildStatus == 'SUCCESS' ? '✅' : '❌'
                def statusColor = buildStatus == 'SUCCESS' ? 'good' : 'danger'

                slackSend(
                    channel: env.SLACK_CHANNEL,
                    color: statusColor,
                    message: """
🎭 *Playwright Jenkins Pipeline Report*

*Overall:* ${statusEmoji} ${buildStatus}
*Mode:* Windows Jenkins — No Docker
*Environment:* ${params.ENVIRONMENT}
*Browser:* ${params.BROWSER}
*Test Suite:* ${params.TEST_SUITE}
*Build:* #${env.BUILD_NUMBER}
*Duration:* ${currentBuild.durationString.replace(' and counting', '')}

📊 <${env.BUILD_URL}|Open Jenkins Build>
🔍 <${env.BUILD_URL}console|View Console Logs>
                    """
                )

                emailext(
                    to: 'naveenanimation20@gmail.com,training@naveenautomationlabs.com',
                    subject: "Playwright Jenkins — ${statusEmoji} ${buildStatus} — Build #${env.BUILD_NUMBER}",
                    mimeType: 'text/html',
                    body: """
                        <html>
                        <body style=\"font-family: Arial, sans-serif;\">
                            <h2>🎭 Playwright Jenkins Pipeline</h2>
                            <table border=\"1\" cellpadding=\"8\" cellspacing=\"0\">
                                <tr><td><b>Status</b></td><td>${statusEmoji} ${buildStatus}</td></tr>
                                <tr><td><b>Mode</b></td><td>Windows Jenkins — No Docker</td></tr>
                                <tr><td><b>Environment</b></td><td>${params.ENVIRONMENT}</td></tr>
                                <tr><td><b>Browser</b></td><td>${params.BROWSER}</td></tr>
                                <tr><td><b>Test Suite</b></td><td>${params.TEST_SUITE}</td></tr>
                                <tr><td><b>Build</b></td><td>#${env.BUILD_NUMBER}</td></tr>
                            </table>
                            <p>
                                <a href=\"${env.BUILD_URL}\">Open Jenkins Build</a><br/>
                                <a href=\"${env.BUILD_URL}console\">View Console Logs</a>
                            </p>
                        </body>
                        </html>
                    """
                )
            }
        }

        success {
            echo '═══════════════════════════════════════════'
            echo '  PIPELINE: ✅ SUCCESS — NO DOCKER'
            echo '═══════════════════════════════════════════'
        }

        failure {
            echo '═══════════════════════════════════════════'
            echo '  PIPELINE: ❌ FAILED — NO DOCKER'
            echo '═══════════════════════════════════════════'
        }
    }
}
