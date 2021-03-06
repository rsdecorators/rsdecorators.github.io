 var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        
        var particle={x:-50, y:-50, v:0, d:0};
        
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        
        var centre = {x: canvas.width/2, y: canvas.height/2};    
        
        function isRFromCentre(x, y, r){
            
            return Math.sqrt( (centre.x - x)*(centre.x -x) + (centre.y - y)*(centre.y - y) ) < r;
            
        }
        
        var cols = ["rgba(180,180,255,0.7)", "rgba(160,160,255,0.8)", "rgba(170,170,250,0.7)"]
        var colSwitch = 0;
        var strokeCount = 0;
        
        function draw(){
            
            
            if(!isRFromCentre(particle.x, particle.y, 160)){        
                strokeCount++;
                if(strokeCount > 50){
                    strokeCount = 0;
                    colSwitch = (colSwitch + 1)%cols.length;
                }
                particle.x = centre.x + 200 * Math.random() - 100;
                particle.y = centre.y + 200 * Math.random() - 100;
                particle.v = 10 + 5 * Math.random();
                particle.d = 2 * Math.PI * Math.random();
            }
            
            ctx.beginPath();
            
            particle.x += particle.v * Math.sin(particle.d);
            particle.y += particle.v * Math.cos(particle.d);
            
            ctx.fillStyle=cols[colSwitch];
            ctx.arc(particle.x, particle.y, 8 + 2 * Math.random(), 0, 2*Math.PI);
            ctx.fill();
            
            window.requestAnimationFrame(draw);
        }   
        
        draw(); 