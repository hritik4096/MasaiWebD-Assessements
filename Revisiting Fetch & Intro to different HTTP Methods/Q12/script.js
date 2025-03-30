document.getElementById("postForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const body = document.getElementById("body").value.trim();
    const responseDiv = document.getElementById("response");

    if (title === "" || body === "") {
        alert("Both fields are required.");
        return;
    }

    const postData = {
        title: title,
        body: body,
        userId: 1
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        responseDiv.innerHTML = `
            <strong>Post ID:</strong> ${data.id} <br>
            <strong>Title:</strong> ${data.title} <br>
            <strong>Body:</strong> ${data.body}
        `;
    })
    .catch(error => {
        responseDiv.innerHTML = `<strong>Error:</strong> Failed to create post.`;
        console.error("Error:", error);
    });

    this.reset();
});
