export const steps = [
    { "name": "Trigger job to move/copy to S3","icon": "/assets/images/awsicons/s3.png" },
    { "name": "for push - N/A, e.g. cron copies from STFP to S3","icon": "/assets/images/awsicons/redshift1.png" },
    { "name": "N/A - will leverage Storage Gateway","icon": "/assets/images/awsicons/Analytics.png" },
    { "name": "On-prem DAtabase to AWS Redshift Replication","icon": "/assets/images/awsicons/quicksight.png" },
    { "name": "Load trailer file to log table","icon": "/assets/images/awsicons/s3.png" },
    { "name": "Reconcile trailer file and raw table count","icon": "/assets/images/awsicons/redshift1.png" },
    { "name": "Trigger notification/alerts","icon": "/assets/images/awsicons/Analytics.png" },
    { "name": "Copy data from source_raw to curated tables","icon": "/assets/images/awsicons/quicksight.png" },
];