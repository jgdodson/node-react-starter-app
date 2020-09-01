FROM node:10.15.3

# Configure working directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Grant permissions to working directory
RUN chown node: /usr/app && chmod u+rw /usr/app

# Switch to non-root user
USER node

# Install dependencies
COPY --chown=node:node package.json package-lock.json ./
RUN npm i && npm cache clean --force

# Copy remaining files
COPY --chown=node:node . .

# Expose port 4000
EXPOSE 4000
