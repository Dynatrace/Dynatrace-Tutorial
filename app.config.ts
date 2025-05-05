import { CliOptions } from "dt-app";

const config: CliOptions = {
  "environmentUrl": process.env.ENVIRONMENT_URL ?? "https://wkf10640.apps.dynatrace.com/",
  "app": {
    "name": "new-tutorial",
    "version": "0.0.0",
    "description": "A starting project with routing, fetching data, and charting",
    "id": "my.new.tutorial.github.actions",
    "scopes": [
      { "name": "storage:buckets:read", "comment": "default template" },
      { "name": "storage:metrics:read", "comment": "default template" },
      { "name": "storage:entities:read", "comment": "default template" },
      { "name" : "app-engine:apps:install", "comment": "Deploying permission"}, 
      { "name" : "app-engine:apps:delete", "comment": "Deploying permission"}, 
      { "name" : "app-engine:apps:run", "comment": "Deploying permission"}, 
      { "name" : "app-settings:objects:read", "comment": "Deploying permission"}
    ]
  }
};


module.exports = config;
