# EBS Sample Application - POC

Sample Express.js application with 5 GET REST endpoints for testing PR Metrics Comparison.

## Endpoints

1. `GET /v1/users` - Get all users
2. `GET /v1/users/:id` - Get user by ID
3. `GET /v1/products` - Get all products
4. `GET /v1/orders` - Get orders (with optional query params)
5. `GET /v1/stats` - Get statistics

## Local Development

```bash
# Install dependencies
npm install

# Run locally
npm start

# Or with auto-reload
npm run dev
```

## Testing Endpoints

```bash
# Health check
curl http://localhost:3000/health

# Get users
curl http://localhost:3000/v1/users

# Get user by ID
curl http://localhost:3000/v1/users/1

# Get products
curl http://localhost:3000/v1/products

# Get orders
curl http://localhost:3000/v1/orders

# Get stats
curl http://localhost:3000/v1/stats
```

## Deployment to AWS EBS

### Option 1: Elastic Beanstalk CLI

```bash
# Install EB CLI
pip install awsebcli

# Initialize EB
eb init -p node.js ebs-sample-app

# Create environment
eb create poc-ebs-env

# Deploy
eb deploy
```

### Option 2: AWS Console

1. Go to Elastic Beanstalk Console
2. Create new application: `ebs-sample-app`
3. Create new environment: `poc-ebs-env`
4. Upload `package.json` and `server.js`
5. Deploy

## Configuration for PR Metrics

The application is configured to work with PR Metrics Comparison:
- Routes are in standard REST format
- Endpoints follow `/v1/*` pattern
- Compatible with ALB metrics collection

## Environment Variables

- `PORT` - Server port (default: 3000)

