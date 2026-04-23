# Sportz WebSockets

Sportz WebSockets is a specialized real-time broadcasting engine designed to facilitate live sports updates and play-by-play commentary. This project provides a robust backend infrastructure that synchronizes high-frequency data across multiple client connections, ensuring that match events are delivered with minimal latency. It is ideal for applications requiring live scoreboards, live text commentary, or real-time sports analytics.

## Description

The core of the application is an event-driven architecture built on Node.js. It leverages a hybrid approach, using a REST API for standard data management (like creating matches or fetching history) and WebSockets for the live broadcast stream. By utilizing a subscription-based model, the server efficiently manages resources by only pushing data to clients interested in specific events. The system is hardened with schema validation and rate limiting to ensure reliability during high-traffic match events.

## Features

- Real-Time Broadcasting: Instant delivery of match events and scores via per-match WebSocket subscriptions.
- Structured Messaging: Implementation of a subscription-based protocol for managing client connections.
- Reliability and Stability: Built-in support for heartbeats (ping/pong), backpressure protection, and rate limiting.
- Strict Validation: Uses Zod schemas to ensure all incoming and outgoing data adheres to strict structures.
- Security First: Integrated with Arcjet for rate limiting and bot protection.
- Seeding Tools: Includes scripts to simulate live game environments for testing and development.

## Tech Stack

- Runtime: Node.js
- Framework: Express.js
- Database: PostgreSQL
- ORM: Drizzle ORM
- Real-Time: WebSockets (ws library)
- Validation: Zod
- Security: Arcjet
- Configuration: Dotenv, TypeScript

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL instance
- Arcjet API Key (optional for local dev)

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/SandroSh/sportz-websockets.git](https://github.com/SandroSh/sportz-websockets.git)
   cd sportz-websockets
