---
name: deploy-plan
description: Analyze current setup and propose AWS deployment strategy.
user-invokable: true
disable-model-invocation: true
---

When the user runs `/deploy-plan`:

1. **Audit current configuration**:
   - Read `next.config.ts` — standalone output configured? Image optimization settings?
   - Read `package.json` — build scripts, dependencies
   - Check for Dockerfile, docker-compose.yaml, .dockerignore
   - Check environment variables needed
2. **Evaluate deployment readiness**:
   - Standalone output mode enabled?
   - Image optimization strategy (built-in vs external loader)?
   - ISR behavior and caching requirements
   - CDN needs for static assets and media
3. **Propose architecture** — Compare three options:

   **Option A: AWS Amplify**
   - Pros: Managed, auto-deploy from Git, built-in CI/CD
   - Cons: Less control, ISR limitations, cost at scale

   **Option B: CloudFront + S3 + Lambda@Edge**
   - Pros: Full CDN control, edge rendering, cost-effective at scale
   - Cons: Complex setup, manual ISR implementation

   **Option C: ECS/Fargate**
   - Pros: Full control, Docker-based, scales well, native ISR
   - Cons: Higher baseline cost, more infrastructure to manage

4. **Recommend** one option with rationale
5. **Provide**: Architecture diagram (mermaid), cost estimate, implementation roadmap
