import React from 'react'

const About = () => { 
    return (
        <div className="container py-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="text-center text-primary">About iNotebook</h1>
              <p className="lead text-muted text-center">
                Welcome to iNotebook, your personal cloud-based note-taking application. With iNotebook, you can keep all your important notes in one secure, easy-to-access location.
              </p>
              
              <h2 className="mt-4">Features:</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Write and store unlimited notes</li>
                <li className="list-group-item">Access your notes from any device with an internet connection</li>
                <li className="list-group-item">Organize your notes with simple tags and categories</li>
                <li className="list-group-item">Search for notes quickly and easily</li>
                <li className="list-group-item">Cloud synchronization for seamless access</li>
              </ul>

              <h2 className="mt-4">How it works:</h2>
              <p>
                iNotebook stores your notes securely in the cloud, ensuring they are accessible from any device, at any time. All your data is encrypted to ensure privacy and security.
              </p>
              <p>
                Whether you're a student, professional, or someone who loves to stay organized, iNotebook is designed to help you stay on top of your notes and ideas.
              </p>
              
              <h2 className="mt-4">Get Started:</h2>
              <p>
                To start using iNotebook, simply sign up for an account and begin creating your notes right away!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default About
