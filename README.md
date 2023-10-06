# AI-Based Agent Escalation and Case Categorization Solution

**Project Overview**

This repository contains the source code and documentation for an AI-based Agent Escalation and Case Categorization Solution developed from September 2023 to September 2023. This solution leverages Salesforce technologies, including Einstein Bot Builder, Service Cloud, Omni Studio, Flow Builder, and Community Cloud, to automate case routing and enhance customer service processes.

## Introduction

The AI-Based Agent Escalation and Case Categorization Solution is designed to streamline customer service operations by automating the escalation of cases from front agents to specialist agents based on the knowledge available to the front agents through knowledge articles. This automation saves time for clients by directing them to specialist agents who can address their specific needs, rather than going through a front agent who may not have the necessary expertise.

This solution includes the following key components:

- Einstein Chatbot: Developed using Einstein Bot Builder, this chatbot interacts with users, collects case details, and analyzes user queries to determine if they require the expertise of a specialist agent.

- Service Cloud Integration: Integrated with Service Cloud to route specific cases to specialist agents based on the analysis performed by the chatbot.

- External Node Application: Hosted on Google Cloud Platform (GCP), this external application utilizes Natural Language Processing (NLP) libraries to analyze user queries and match them with knowledge articles available to front agents.

- Salesforce Experience Cloud Integration: The Einstein Bot is integrated into a Salesforce Experience Cloud site, enhancing user interaction and automating customer service processes.

- Real-time Communication: Communication between the chatbot and the external Node.js application is established using Remote Site Settings and Apex HTTP callouts to facilitate real-time data exchange.

- Apex Classes and Flows: Multiple Apex classes and flows are developed to structure the functionality of the chatbot on the external site and communication with the external Node application.

## Features

- Automatic Case Escalation: Cases are automatically escalated to specialist agents when the chatbot determines that the front agent does not have the knowledge to address the user's query based on available knowledge articles.

- Enhanced User Interaction: Integration with Salesforce Experience Cloud enhances the user experience by providing a seamless interface for interacting with the chatbot.

- Real-time Data Exchange: Real-time communication with the external Node.js application ensures the accuracy of user query analysis and knowledge article matching.

- Improved Efficiency: Front agents can focus on queries they can solve, while specialist agents handle cases that require their expertise, resulting in better resource allocation and client satisfaction.

## Technologies Used

- Einstein Bot Builder
- Flow Builder
- Apex Classes (HTTP and Email callouts)
- Invocable Callouts for Bulk Processes
- Omni Studio
- Embedded Service & Queues
- Sites and Community Cloud
- Remote Site Settings
- Node.js, JavaScript, and NLP libraries
- Record Types

## Installation

1. Clone this repository to your local environment.
2. Deploy the Salesforce components, including Apex classes, flows, and Einstein Bot configurations, to your Salesforce org.
3. Set up the external Node.js application on Google Cloud Platform (GCP) and ensure it is accessible via a public URL.
4. Configure the Remote Site Settings in your Salesforce org to allow communication with the external Node.js application.

## Usage

1. Access the Salesforce Experience Cloud site where the Einstein Bot is integrated.
2. Users can interact with the chatbot by providing their query in text format.
3. The chatbot will analyze user queries and check if the assigned front agent has the knowledge to address the query based on available knowledge articles.
4. If the front agent lacks the required knowledge, the user will be directly assigned to a specialist agent, saving time for both the client and the front agent.
5. Specialist agents can efficiently handle cases that require their expertise.

Feel free to explore and contribute to this AI-Based Agent Escalation and Case Categorization Solution.

## Contributing

Contributions to this project are welcome. Please follow the guidelines outlined in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the [MIT License](LICENSE).
