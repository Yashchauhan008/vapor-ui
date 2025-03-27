import React, { useEffect, useRef, useState } from 'react';

class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  static add(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }

  static sub(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }

  add(x, y) {
    if (arguments.length === 1) {
      this.x += x.x;
      this.y += x.y;
    } else if (arguments.length === 2) {
      this.x += x;
      this.y += y;
    }
    return this;
  }

  sub(x, y) {
    if (arguments.length === 1) {
      this.x -= x.x;
      this.y -= x.y;
    } else if (arguments.length === 2) {
      this.x -= x;
      this.y -= y;
    }
    return this;
  }

  mult(v) {
    if (typeof v === 'number') {
      this.x *= v;
      this.y *= v;
    } else {
      this.x *= v.x;
      this.y *= v.y;
    }
    return this;
  }

  setXY(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  dist(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Mouse {
  constructor(canvas) {
    this.pos = new Vector(-1000, -1000);
    this.radius = 40;
    this.canvas = canvas;

    canvas.onmousemove = e => this.updatePosition(e.clientX, e.clientY);
    canvas.ontouchmove = e => this.updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    canvas.ontouchcancel = () => this.pos.setXY(-1000, -1000);
    canvas.ontouchend = () => this.pos.setXY(-1000, -1000);
  }

  updatePosition(clientX, clientY) {
    // Get the canvas's position relative to the viewport
    const rect = this.canvas.getBoundingClientRect();
    
    // Convert client coordinates to canvas coordinates
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Set the position
    this.pos.setXY(x, y);
  }
}

class Dot {
  constructor(x, y, lightColor = '#ffcc00', color = '#aaa') {
    this.color = color;
    this.lightColor = lightColor;
    this.pos = new Vector(x, y);
    this.oldPos = new Vector(x, y);

    this.friction = 0.97;
    this.gravity = new Vector(0, 0.6);
    this.mass = 1;

    this.pinned = false;
    this.lightSize = 15;
  }

  update(mouse) {
    if (this.pinned) return;
    
    let vel = Vector.sub(this.pos, this.oldPos);

    this.oldPos.setXY(this.pos.x, this.pos.y);

    vel.mult(this.friction);
    vel.add(this.gravity);

    let { x: dx, y: dy } = Vector.sub(mouse.pos, this.pos);
    const dist = Math.sqrt(dx * dx + dy * dy);

    const direction = new Vector(dx / dist, dy / dist);

    const force = Math.max((mouse.radius - dist) / mouse.radius, 0);
    
    if (force > 0.6) this.pos.setXY(mouse.pos.x, mouse.pos.y);
    else {
      this.pos.add(vel);
      this.pos.add(direction.mult(force));
    }
  }

  drawLight(ctx) {
    const x = this.pos.x;
    const y = this.pos.y;
    const radius = this.lightSize / 2;
    
    // Create radial gradient
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
    gradient.addColorStop(0, this.lightColor);
    gradient.addColorStop(0.7, this.lightColor + '30'); // 25% transparent
    gradient.addColorStop(1, this.lightColor + '00'); // fully transparent
    
    // Add glow effect
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    
    // Draw outer glow
    ctx.beginPath();
    ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw inner circle
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.7, 0, Math.PI * 2);
    ctx.fillStyle = this.lightColor;
    ctx.fill();
    
    ctx.restore();
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x - this.mass, this.pos.y - this.mass, this.mass * 2, this.mass * 2);
  }
}

class Stick {
  constructor(p1, p2, color = '#999') {
    this.color = color;
    this.startPoint = p1;
    this.endPoint = p2;
    
    this.length = this.startPoint.pos.dist(this.endPoint.pos);
    this.tension = 0.3;
  }

  update() {
    const dx = this.endPoint.pos.x - this.startPoint.pos.x;
    const dy = this.endPoint.pos.y - this.startPoint.pos.y;

    const dist = Math.sqrt(dx * dx + dy * dy);
    const diff = (dist - this.length) / dist;

    const offsetX = diff * dx * this.tension;
    const offsetY = diff * dy * this.tension;

    const m = this.startPoint.mass + this.endPoint.mass;
    const m1 = this.endPoint.mass / m;
    const m2 = this.startPoint.mass / m;

    if (!this.startPoint.pinned) {
      this.startPoint.pos.x += offsetX * m1;
      this.startPoint.pos.y += offsetY * m1;
    }
    if (!this.endPoint.pinned) {
      this.endPoint.pos.x -= offsetX * m2;
      this.endPoint.pos.y -= offsetY * m2;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y);
    ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y);
    ctx.stroke();
    ctx.closePath();
  }
}

class Rope {
  constructor(config) {
    this.color = config.color || '#aaa';
    this.lightColor = config.lightColor || '#ffcc00';
    this.x = config.x;
    this.y = config.y;
    this.segments = config.segments || 10;
    this.gap = config.gap || 15;

    this.dots = [];
    this.sticks = [];

    this.iterations = 10;

    this.create();
  }

  pin(index) {
    this.dots[index].pinned = true;
  }

  create() {
    for (let i = 0; i < this.segments; i++) {
      this.dots.push(new Dot(this.x, this.y + i * this.gap, this.lightColor, this.color));
    }
    for (let i = 0; i < this.segments - 1; i++) {
      this.sticks.push(new Stick(this.dots[i], this.dots[i + 1], this.color));
    }
  }
  
  update(mouse) {
    this.dots.forEach(dot => {
      dot.update(mouse);
    });
    for (let i = 0; i < this.iterations; i++) {
      this.sticks.forEach(stick => {
        stick.update();
      });
    }
  }

  draw(ctx) {
    this.dots.forEach(dot => {
      dot.draw(ctx);
    });
    this.sticks.forEach(stick => {
      stick.draw(ctx);
    });
    this.dots[this.dots.length - 1].drawLight(ctx);
  }
}

const Chandelier = ({ color = '#aaa', lightColor = '#ffcc00' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio > 1 ? 2 : 1;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const mouse = new Mouse(canvas);
    const ropes = [];

    const createRopes = () => {
      // Increase the number of ropes to cover full width
      const ropeSpacing = 20; // Adjust this to control rope density
      const totalRopes = Math.floor(window.innerWidth / ropeSpacing);

      for (let i = 0; i < totalRopes; i++) {
        const x = i * ropeSpacing;
        const y = 0;
        const gap = Math.random() * (window.innerHeight * 0.03) + window.innerHeight * 0.05;
        const segments = 10;
        const rope = new Rope({ x, y, gap, segments, color, lightColor });
        rope.pin(0);
        ropes.push(rope);
      }
    };

    createRopes();

    let then = Date.now();
    const interval = 1000 / 60;

    const frame = () => {
      requestAnimationFrame(frame);
      const now = Date.now();
      const delta = now - then;
      
      if (delta < interval) return;
      
      then = now - (delta % interval);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      ropes.forEach(rope => {
        rope.update(mouse);
        rope.draw(ctx);
      });
    };

    requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [color, lightColor]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-transparent flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="select-none"
        style={{ userSelect: 'none' }}
      />
    </div>
  );
};

export default Chandelier;