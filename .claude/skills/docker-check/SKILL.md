# /docker-check

Validate Docker and docker-compose configuration for Next.js best practices.

## Model

haiku

## User-invocable

true

## Instructions

When the user runs `/docker-check`:

1. **Read Docker files**:
   - `Dockerfile` (if exists)
   - `docker-compose.yaml` or `docker-compose.yml` (if exists)
   - `.dockerignore` (if exists)
2. **If no Docker files exist**, report that and suggest creating them
3. **If files exist, check**:
   - **Multi-stage build**: Uses separate stages for deps, build, and runtime
   - **Standalone output**: `next build` produces standalone output, `COPY --from=builder .next/standalone`
   - **Non-root user**: Runs as `nextjs` user (not root)
   - **HEALTHCHECK**: Has a health check instruction
   - **NODE_ENV**: Set to `production` in runtime stage
   - **Layer caching**: `package.json` and `package-lock.json` copied before source for optimal caching
   - **Port**: Exposes port 3000
   - **.dockerignore**: Excludes `node_modules`, `.next`, `.env*`, `.git`
   - **docker-compose**: Proper service configuration, environment variables, volume mounts

## Report Format

```
## Docker Configuration Check

| Check              | Status | Details                    |
|--------------------|--------|----------------------------|
| Multi-stage build  | PASS   | 3 stages (deps/build/run)  |
| Standalone output  | PASS   | Configured                 |
| Non-root user      | FAIL   | Running as root            |
| HEALTHCHECK        | WARN   | Missing                    |
| NODE_ENV           | PASS   | production                 |
| Layer caching      | PASS   | Optimal order              |
| Port               | PASS   | 3000                       |
| .dockerignore      | WARN   | Missing .env* pattern      |

Overall: PASS / WARN / FAIL
```
