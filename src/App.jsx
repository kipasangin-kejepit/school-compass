import { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askScout = async () => {
    if (!question.trim() || loading) return;

    const userMessage = question.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/scout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "scout", text: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "scout",
          text: "Sorry, SCOUT couldn't process your question right now.",
        },
      ]);

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      askScout();
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">SCHOOL COMPASS</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#profile">Profile</a>
          <a href="#academics">Academics</a>
          <a href="#student-life">Student Life</a>
          <a href="#facilities">Facilities</a>
          <a href="#scout">SCOUT</a>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">SMAK 3 PENABUR JAKARTA</p>

            <h1>
              EXPLORE.
              <br />
              ASK.
              <br />
              DISCOVER.
            </h1>

            <p className="hero-description">
              Your digital guide to school information, academics,
              student life, and more.
            </p>

            <div className="hero-buttons">
              <a href="#profile" className="primary-button">
                Explore School
              </a>

              <a href="#scout" className="secondary-button">
                Ask SCOUT
              </a>
            </div>
          </div>

          <div className="hero-card">
            <span>SCOUT</span>
            <h2>School Compass Online Utility Tool</h2>
            <p>
              Your AI-powered information assistant for school-related
              questions.
            </p>
          </div>
        </section>

        <section className="info-section" id="profile">
          <p className="section-label">01 — SCHOOL PROFILE</p>
          <h2>Know the School.</h2>
          <p>
            Explore the school's profile, history, vision, mission,
            and identity.
          </p>
        </section>

        <section className="cards-section" id="academics">
          <p className="section-label">02 — EXPLORE</p>

          <div className="cards">
            <div className="info-card">
              <span>ACADEMICS</span>
              <h3>Learn.</h3>
              <p>Discover academic programs and learning information.</p>
            </div>

            <div className="info-card" id="student-life">
              <span>STUDENT LIFE</span>
              <h3>Experience.</h3>
              <p>Explore extracurriculars and student activities.</p>
            </div>

            <div className="info-card" id="facilities">
              <span>FACILITIES</span>
              <h3>Discover.</h3>
              <p>See the facilities available within the school.</p>
            </div>
          </div>
        </section>

        <section className="scout-section" id="scout">
          <div>
            <p className="section-label">03 — ASK</p>
            <h2>Meet SCOUT.</h2>
            <p>
              Have a question about the school? SCOUT is your
              AI-powered information assistant.
            </p>
          </div>

          <div className="chat-box">
            <div className="chat-header">
              <strong>SCOUT</strong>
              <span>AI Information Assistant</span>
            </div>

            <div className="chat-messages">
              {messages.length === 0 && (
                <div className="chat-message">
                  Hi! I'm SCOUT. What would you like to know about the
                  school?
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    message.role === "user" ? "user-message" : ""
                  }`}
                >
                  {message.text}
                </div>
              ))}

              {loading && (
                <div className="chat-message">
                  SCOUT is thinking...
                </div>
              )}
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Ask about the school..."
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />

              <button onClick={askScout} disabled={loading}>
                →
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <strong>SCHOOL COMPASS</strong>
        <span>EXPLORE. ASK. DISCOVER.</span>
      </footer>
    </div>
  );
}

export default App;