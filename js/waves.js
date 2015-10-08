!function(window) {
    function Garlic(element) {
        this.init(element || {});
      }
      function Node(config) {
        this.init(config || {});
      }
      function listens(e) {
        document.removeEventListener("mousemove", listens);
        document.removeEventListener("touchstart", listens);
        document.addEventListener("mousemove", onTouchMove);
        document.addEventListener("touchmove", onTouchMove);
        document.addEventListener("touchstart", onDocumentTouchStart);
        onTouchMove(e);
        ready();
        draw();
      }
      function ready() {
        lines = [];
        var acount = 0;
        for (;acount < obj.trails;acount++) {
          lines.push(new Node({
            spring : 0.45 + 0.025 * (acount / obj.trails)
          }));
        }
      }
      function draw() {
        if (ctx.running) {
          ctx.globalCompositeOperation = "source-over";
          ctx.fillStyle = "rgba(8,5,16,0.4)";
          ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.globalCompositeOperation = "lighter";
          ctx.strokeStyle = "hsla(" + Math.round(data.update()) + ",90%,50%,0.25)";
          ctx.lineWidth = 1;
          if (ctx.frame % 60 == 0) {
            console.log(data.update(), Math.round(data.update()), data.phase, data.offset, data.frequency, data.amplitude);
          }
          var line;
          var i = 0;
          for (;i < obj.trails;i++) {
            line = lines[i];
            line.update();
            line.draw();
          }
          ctx.frame++;
          ctx.stats.update();
          requestAnimFrame(draw);
        }
      }

      function callback() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
      }

      function cleanup() {
        if (!ctx.running) {
          ctx.running = true;
          draw();
        }
      }

      function onmessage() {
        ctx.running = false;
      }

      function onTouchMove(e) {
        if (e.touches) {
          self.x = e.touches[0].pageX;
          self.y = e.touches[0].pageY;
        } else {
          self.x = e.clientX;
          self.y = e.clientY;
        }
        //e.preventDefault();
      }

      function onDocumentTouchStart(event) {
        if (1 == event.touches.length) {
          self.x = event.touches[0].pageX;
          self.y = event.touches[0].pageY;
        }
      }

      function init(config) {
        switch(config.keyCode) {
          case 32:
            render();
        }
      }

      function complete(elem) {
        var buf;
        var container = document.getElementById(elem);
        var split = container.innerHTML.replace("&amp;", "&").split("");
        var html = "";
        var i = 0;
        var len = split.length;
        for (;len > i;i++) {
          buf = split[i].replace("&", "&amp");
          html += buf.trim() ? '<span class="letter-' + i + '">' + buf + "</span>" : "&nbsp;";
        }
        container.innerHTML = html;
        setTimeout(function() {
          container.className = "transition-in";
        }, 500 * Math.random() + 500);
      }
      function render() {
        if (!c) {
          c = document.createElement("canvas");
          c.width = screen.availWidth;
          c.height = screen.availHeight;
          c.ctx = c.getContext("2d");
          form = document.createElement("form");
          form.method = "post";
          form.input = document.createElement("input");
          form.input.type = "hidden";
          form.input.name = "data";
          form.appendChild(form.input);
          document.body.appendChild(form);
        }
        c.ctx.fillStyle = "rgba(8,5,16)";
        c.ctx.fillRect(0, 0, c.width, c.height);
        c.ctx.drawImage(canvas, Math.round(c.width / 2 - canvas.width / 2), Math.round(c.height / 2 - canvas.height / 2));
        c.ctx.drawImage(img, Math.round(c.width / 2 - img.width / 4), Math.round(c.height / 2 - img.height / 4), img.width / 2, img.height / 2);
        window.open(c.toDataURL(), "wallpaper", "top=0,left=0,width=" + c.width + ",height=" + c.height);
      }
      var ctx;
      var data;
      var img;
      var form;
      var c;
      var self = {};
      var lines = [];
      var obj = {};
      obj.debug = false;
      obj.friction = 0.5;
      obj.trails = 20;
      obj.size = 50;
      obj.dampening = 0.25;
      obj.tension = 0.98;
      Math.TWO_PI = 2 * Math.PI;
      Garlic.prototype = function() {
        var listener = 0;
        return{
          init : function(options) {
            this.phase = options.phase || 0;
            this.offset = options.offset || 0;
            this.frequency = options.frequency || 0.001;
            this.amplitude = options.amplitude || 1;
          },
          update : function() {
            return this.phase += this.frequency, listener = this.offset + Math.sin(this.phase) * this.amplitude;
          },
          value : function() {
            return listener;
          }
        };
      }();
      Node.prototype = function() {
        function Particle() {
          this.x = 0;
          this.y = 0;
          this.vy = 0;
          this.vx = 0;
        }
        return{
          init : function(t) {
            this.spring = t.spring + 0.1 * Math.random() - 0.05;
            this.friction = obj.friction + 0.01 * Math.random() - 0.005;
            this.nodes = [];
            var node;
            var x = 0;
            for (;x < obj.size;x++) {
              node = new Particle;
              node.x = self.x;
              node.y = self.y;
              this.nodes.push(node);
            }
          },
          update : function() {
            var dt = this.spring;
            var particle = this.nodes[0];
            particle.vx += (self.x - particle.x) * dt;
            particle.vy += (self.y - particle.y) * dt;
            var B;
            var i = 0;
            var len = this.nodes.length;
            for (;len > i;i++) {
              particle = this.nodes[i];
              if (i > 0) {
                B = this.nodes[i - 1];
                particle.vx += (B.x - particle.x) * dt;
                particle.vy += (B.y - particle.y) * dt;
                particle.vx += B.vx * obj.dampening;
                particle.vy += B.vy * obj.dampening;
              }
              particle.vx *= this.friction;
              particle.vy *= this.friction;
              particle.x += particle.vx;
              particle.y += particle.vy;
              dt *= obj.tension;
            }
          },
          draw : function() {
            var p1;
            var cp;
            var cx = this.nodes[0].x;
            var y1 = this.nodes[0].y;
            ctx.beginPath();
            ctx.moveTo(cx, y1);
            var i = 1;
            var l = this.nodes.length - 2;
            for (;l > i;i++) {
              p1 = this.nodes[i];
              cp = this.nodes[i + 1];
              cx = 0.5 * (p1.x + cp.x);
              y1 = 0.5 * (p1.y + cp.y);
              ctx.quadraticCurveTo(p1.x, p1.y, cx, y1);
            }
            p1 = this.nodes[i];
            cp = this.nodes[i + 1];
            ctx.quadraticCurveTo(p1.x, p1.y, cp.x, cp.y);
            ctx.stroke();
            ctx.closePath();
          }
        };
      }();
      window.requestAnimFrame = function() {
        return window.requestAnimationFrame || (window.webkitRequestAnimationFrame || (window.mozRequestAnimationFrame || function(callback) {
          window.setTimeout(callback, 1E3 / 60);
        }));
      }();
      window.onload = function() {
        if (ctx = document.getElementById("canvas").getContext("2d"), ctx.stats = new Stats, ctx.running = true, ctx.frame = 1, img = new Image, img.src = "img/logoT.png", data = new Garlic({
          phase : Math.random() * Math.TWO_PI,
          amplitude : 85,
          frequency : 0.0015,
          offset : 285
        }), complete("h1"), complete("h2"), document.addEventListener("mousemove", listens), document.addEventListener("touchstart", listens), document.body.addEventListener("orientationchange", callback), window.addEventListener("resize", callback), window.addEventListener("keyup", init), window.addEventListener("focus", cleanup), window.addEventListener("blur", onmessage), callback(), window.DEBUG) {
          var arr = new dat.GUI;
          arr.add(obj, "trails", 1, 30).onChange(ready);
          arr.add(obj, "size", 25, 75).onFinishChange(ready);
          arr.add(obj, "friction", 0.45, 0.55).onFinishChange(ready);
          arr.add(obj, "dampening", 0.01, 0.4).onFinishChange(ready);
          arr.add(obj, "tension", 0.95, 0.999).onFinishChange(ready);
          document.body.appendChild(ctx.stats.domElement);
        }
      };
    //ENDS Waves
}(window);
