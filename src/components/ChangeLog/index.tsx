import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface Tag {
  tag: string;
  id: string;
}

interface ChangeLogItem {
  id: string;
  publishDate: string;
  title: string;
  content_html: string;
  tags: Tag[];
}

interface ChangeLogResponse {
  docs: ChangeLogItem[];
}

const BASE_URL = 'https://texturehq.payloadcms.app';

const ChangeLog: React.FC = () => {
  const [changeLogItems, setChangeLogItems] = useState<ChangeLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: React.RefObject<HTMLDivElement> }>({});
  const [topOffset, setTopOffset] = useState(0);
  const floatingNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchChangeLog = async () => {
      try {
        const response = await axios.get<ChangeLogResponse>(`${BASE_URL}/api/change-log`);
        setChangeLogItems(response.data.docs);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch change log data');
        setLoading(false);
      }
    };

    fetchChangeLog();
  }, []);

  useEffect(() => {
    changeLogItems.forEach((item) => {
      sectionRefs.current[item.id] = React.createRef<HTMLDivElement>();
    });
  }, [changeLogItems]);

  useEffect(() => {
    const updateTopOffset = () => {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      setTopOffset(navbarHeight + 20);
    };

    updateTopOffset();
    window.addEventListener('resize', updateTopOffset);
    return () => window.removeEventListener('resize', updateTopOffset);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    sectionRefs.current[id].current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="change-log-container">
      <div className="change-log">
        {changeLogItems.map((item) => (
          <article key={item.id} className="change-log-item" ref={sectionRefs.current[item.id]}>
            <h2>{item.title}</h2>
            <p>Published on: {new Date(item.publishDate).toLocaleDateString()}</p>
            <div className="content" dangerouslySetInnerHTML={{ __html: item.content_html }} />
            <div className="tags">
              {item.tags.map((tag) => (
                <span key={tag.id} className="tag">
                  {tag.tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <nav className="floating-nav" ref={floatingNavRef} style={{ top: `${topOffset}px` }}>
        <h3>Release Note Events</h3>
        <ul>
          {changeLogItems.map((item) => (
            <li key={item.id} className={activeSection === item.id ? 'active' : ''}>
              <a href={`#${item.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}>
                {item.title}
                <span className="nav-date">{new Date(item.publishDate).toLocaleDateString()}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <style jsx>{`
        .change-log-container {
          display: flex;
          justify-content: space-between;
          padding-top: 20px;
        }
        .change-log {
          width: 70%;
        }
        .change-log-item {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #eaeaea;
        }
        .tags {
          margin-top: 1rem;
        }
        .tag {
          display: inline-block;
          background-color: #f0f0f0;
          color: #333;
          padding: 0.25rem 0.5rem;
          margin-right: 0.5rem;
          margin-bottom: 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
          transition: background-color 0.2s;
        }
        .tag:hover {
          background-color: #e0e0e0;
        }
        .floating-nav {
          width: 25%;
          position: sticky;
          align-self: flex-start;
          background-color: #f8f8f8;
          padding: 1rem;
          border-radius: 4px;
          max-height: calc(100vh - 120px);
          overflow-y: auto;
        }
        .floating-nav h3 {
          margin-top: 0;
        }
        .floating-nav ul {
          list-style-type: none;
          padding: 0;
        }
        .floating-nav li {
          margin-bottom: 0.5rem;
        }
        .floating-nav a {
          text-decoration: none;
          color: #333;
          display: block;
          padding: 0.25rem 0;
        }
        .floating-nav li.active a {
          font-weight: bold;
          color: #0070f3;
        }
        .nav-date {
          display: block;
          font-size: 0.8rem;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default ChangeLog;