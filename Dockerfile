# Use a lightweight Node.js image as the base
FROM node:18-alpine

# Set environment variables
ENV NEXT_PUBLIC_BACKEND_SERVICE_BASE_URL=https://backend-dot-lexin-ta.et.r.appspot.com
ENV NEXT_PUBLIC_SEMANTIC_SEARCH_API_HOST=https://lexin.cs.ui.ac.id/chat/api/v1
ENV NEXT_PUBLIC_LLM_API_PATH=/chat/app/api/v1/ask
ENV GOOGLE_GENERATIVE_AI_API_KEY=${GOOGLE_GENERATIVE_AI_API_KEY}
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV HTTP_PROXY="http://proxy.cs.ui.ac.id:8080"
ENV http_proxy="http://proxy.cs.ui.ac.id:8080"
ENV HTTPS_PROXY="http://proxy.cs.ui.ac.id:8080"
ENV https_proxy="http://proxy.cs.ui.ac.id:8080"


# Create and set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy the package manager files and install dependencies
COPY pnpm-lock.yaml ./
RUN pnpm fetch

# Copy the application files
COPY . .
COPY /public /app/backups/public

# Install dependencies
RUN pnpm install

# Build project
RUN pnpm build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start"]