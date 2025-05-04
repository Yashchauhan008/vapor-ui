import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TechStackShowcase from "../../content/AnimatedElements/TechStackShowcase";
import PropsTable from "../../components/PropTable";
import DependencyList from "../../components/DependencyList";

const TechStackShowcaseDemo = () => {
  // Sample techStacks data

  const techStacks = [
    {
      id: 'frontend',
      title: 'Frontend',
      color: '#61DAFB',
      icon: '🎨',
      items: ['React', 'Next.js', 'Vue', 'Angular', 'Svelte'],
      description: 'Modern JavaScript frameworks and libraries for building responsive user interfaces with component-based architecture.'
    },
    {
      id: 'backend',
      title: 'Backend',
      color: '#68A063',
      icon: '⚙️',
      items: ['Node.js', 'Express', 'Django', 'Ruby on Rails', 'Spring Boot'],
      description: 'Server-side technologies handling business logic, database operations, and API integrations.'
    },
    {
      id: 'database',
      title: 'Database',
      color: '#336791',
      icon: '🗄️',
      items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Firebase'],
      description: 'Data storage solutions ranging from traditional relational databases to modern NoSQL and real-time options.'
    },
    {
      id: 'devops',
      title: 'DevOps',
      color: '#FF9900',
      icon: '🚀',
      items: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Terraform'],
      description: 'Tools and practices for CI/CD, infrastructure as code, and cloud deployment automation.'
    },
    {
      id: 'mobile',
      title: 'Mobile',
      color: '#61DBFB',
      icon: '📱',
      items: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin'],
      description: 'Cross-platform and native frameworks for building mobile applications with native-like performance.'
    }
  ];


  const Props = [
    {
      property:"techStacks",
      type:"Array",
      default:"[{}]",
      description:"Array of tech stack objects to display. Each object should include id, title, icon, color, description, and items properties."
    }
  ]


  const propsDocumentation = [
    {
      property: "id",
      type: "string",
      default: "-",
      description: "Unique identifier for the tech stack"
    },
    {
      property: "title",
      type: "string",
      default: "-",
      description: "Name of the tech stack category"
    },
    {
      property: "icon",
      type: "ReactNode",
      default: "-",
      description: "Icon component or emoji to represent the tech stack"
    },
    {
      property: "color",
      type: "string",
      default: "-",
      description: "Hex color code (e.g., \"#6366F1\") for theme color of this stack"
    },
    {
      property: "description",
      type: "string",
      default: "-",
      description: "Detailed description of the tech stack category"
    },
    {
      property: "items",
      type: "Array<string>",
      default: "[]",
      description: "List of technology names that belong to this category"
    }
  ];

  const deps = ["react","framer-motion"]




  return (
    <>
      <div className="demo-box">
        <div className="preview-box">
          <TechStackShowcase techStacks={techStacks} />
        </div>
        <div className="states">
        <h3>Props</h3>
        <PropsTable properties={Props}/>
        <h3>Tech Stack Object Structure</h3>
        <PropsTable properties={propsDocumentation}/>
        <h3>Dependencies</h3>
        <DependencyList deps={deps}/>
        </div>
      </div>
    </>
  );
};

export default TechStackShowcaseDemo;
