
FROM python:3.12

ARG USERNAME=Accu
ARG USER_UID=1000
ARG USER_GID=$USER_UID

WORKDIR /home/accu

# System dependencies: SQLite and sudo
RUN apt-get update && apt-get install -y \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Create the user with sudo permissions
RUN mkdir -p /etc/sudoers.d
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME -s /bin/bash \
    && echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Permissions for the workspace folder
RUN sudo chown -R Accu:Accu /home/accu

# Switch to the new user
USER $USERNAME

# Install Python dependencies
WORKDIR /home/accu
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# # Copy the rest of the application code
# COPY . /home/melda

# Expose Flask port
EXPOSE 5000
EXPOSE 3000

# Set the default command to run Flask when the container starts
CMD ["flask", "run", "--host=0.0.0.0"]