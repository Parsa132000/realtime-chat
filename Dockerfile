# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set working directory inside container
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code into /app
COPY backend/ /app

# (Optional) Copy frontend if you still want to mount static files
COPY frontend/ /frontend

# Expose FastAPI's port
EXPOSE 8000

# Start FastAPI with main.py directly (since it's now at /app/main.py)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
