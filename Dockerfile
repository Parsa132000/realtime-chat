# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy both backend and frontend folders into the image
COPY backend ./backend
COPY frontend ./frontend

# Expose the port FastAPI runs on
EXPOSE 8000

# Start the FastAPI server using uvicorn
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
