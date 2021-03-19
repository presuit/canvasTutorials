const setShadow = (ctx, x, y, blur, color) => {
  ctx.shadowOffsetX = x;
  ctx.shadowOffsetY = y;
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
};
const resetShadow = (ctx) => {
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
};

const changeFontSize = (ctx, size) => {
  ctx.font = `${size}px sans-serif`;
};

class NetflixLogo {
  constructor(x, y, width, height) {
    this.logoColor = "#E50914";
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.squareWidth = this.width / 3;
    this.squareHeight = this.height;

    this.firstSquare = {
      x: this.x,
      y: this.y,
      width: this.squareWidth,
      height: this.squareHeight,
    };

    this.thirdSquare = {
      x: this.x + this.width - this.squareWidth,
      y: this.y,
      width: this.squareWidth,
      height: this.squareHeight,
    };

    this.secondSquare = [
      { x: this.firstSquare.x, y: this.firstSquare.y },
      { x: this.firstSquare.x + this.squareWidth, y: this.firstSquare.y },
      {
        x: this.thirdSquare.x + this.squareWidth,
        y: this.thirdSquare.y + this.squareHeight,
      },
      { x: this.thirdSquare.x, y: this.thirdSquare.y + this.squareHeight },
    ];
  }

  draw(ctx) {
    // draw first square
    ctx.fillStyle = "#E50914";
    ctx.fillRect(
      this.firstSquare.x,
      this.firstSquare.y,
      this.firstSquare.width,
      this.firstSquare.height
    );
    // draw third Square
    ctx.fillRect(
      this.thirdSquare.x,
      this.thirdSquare.y,
      this.thirdSquare.width,
      this.thirdSquare.height
    );
    // draw Second Square
    setShadow(ctx, 4, 4, 5, "black");

    ctx.beginPath();
    ctx.moveTo(this.secondSquare[0].x, this.secondSquare[0].y);
    for (const item of this.secondSquare) {
      ctx.lineTo(item.x, item.y);
    }
    ctx.lineTo(this.secondSquare[0].x, this.secondSquare[0].y);
    ctx.fill();
    ctx.closePath();
  }
}

class NetflixCastButton {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.wifiWidth = this.width / 2;
    this.wifiHeight = this.height / 2;
    this.wifiGap = this.wifiWidth / 5;
  }

  draw(ctx) {
    resetShadow(ctx);
    ctx.strokeStyle = "white";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    for (let i = 0; i < this.wifiGap; i++) {
      ctx.fillStyle = "black";
      if (i % 2 === 0) {
        ctx.fillStyle = "white";
      }
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + this.height);
      ctx.arc(
        this.x,
        this.y + this.height,
        this.wifiWidth - i * this.wifiGap,
        -Math.PI / 2,
        0
      );
      ctx.fill();
      ctx.closePath();
    }
  }
}

class NetflixProfileIcon {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.squareGapX = this.width / 5;
    this.squareGapY = this.height / 5;
    this.eyeWidth = this.width / 15;
    this.smile = [
      {
        x: this.x + (this.x + this.width - this.x) * 0.25,
        y: (this.y + (this.y + this.height)) / 2,
      },
      {
        x: this.x + (this.x + this.width - this.x) * 0.25,
        y: (this.y + (this.y + this.height)) * 0.6,
      },
      {
        x: this.x + this.width - 5,
        y: (this.y + (this.y + this.height)) * 0.6,
      },
      {
        x: this.x + this.width - 5,
        y: (this.y + (this.y + this.height)) * 0.48,
      },
    ];
  }

  draw(ctx) {
    ctx.fillStyle = "#FBBF24";
    ctx.lineJoin = "round";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(
      this.x + this.squareGapX,
      this.y + this.squareGapY,
      this.eyeWidth,
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.arc(
      this.x + this.squareGapX * 4,
      this.y + this.squareGapY,
      this.eyeWidth,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(this.smile[0].x, this.smile[0].y);
    ctx.bezierCurveTo(
      this.smile[1].x,
      this.smile[1].y,
      this.smile[2].x,
      this.smile[2].y,
      this.smile[3].x,
      this.smile[3].y
    );
    ctx.stroke();

    ctx.closePath();
  }
}

class HomeButton {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.midX = (this.x + this.width + this.x) / 2;
    this.midY = (this.y + this.y + this.height) / 2;

    this.points = [];
    this.points.push({ x: this.midX, y: this.y });
    this.points.push({ x: this.x, y: this.midY });
    this.points.push({ x: this.x + 5, y: this.midY });
    this.points.push({ x: this.x + 5, y: this.y + this.height });
    this.points.push({ x: this.x + this.width - 5, y: this.y + this.height });
    this.points.push({ x: this.x + this.width - 5, y: this.midY });
    this.points.push({ x: this.x + this.width, y: this.midY });
    this.points.push({ x: this.midX, y: this.y });
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (const item of this.points) {
      ctx.lineTo(item.x, item.y);
    }
    ctx.stroke();
    ctx.closePath();
  }
}

class BottomNavigation {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.homeButton = new HomeButton(this.x + 20, this.y + 10, 30, 30);
  }

  draw(ctx) {
    ctx.fillStyle = "firebrick";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.homeButton.draw(ctx);
    ctx.fillStyle = "white";
    changeFontSize(ctx, 15);

    ctx.fillText(
      "Home",
      this.homeButton.x - 5,
      this.homeButton.y + this.homeButton.height + 20
    );
  }
}

class NetflixHeader {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.elementBaseWidth = this.width / 15;
    this.elementBaseHeight = this.height / 3;
    this.logo = new NetflixLogo(
      this.x + 20,
      this.y + 20,
      this.elementBaseWidth - 10,
      this.elementBaseHeight - 5
    );

    this.profileButton = new NetflixProfileIcon(
      this.x + this.width - 50,
      this.logo.y + this.logo.height / 3,

      this.elementBaseWidth,
      this.elementBaseHeight * 0.57
    );

    this.castButton = new NetflixCastButton(
      this.profileButton.x - this.elementBaseWidth - 30,
      this.profileButton.y,
      this.elementBaseWidth,
      this.elementBaseHeight / 2
    );

    this.tvShows = {
      x: this.logo.x + 50,
      y: this.logo.y + this.logo.height + 50,
    };

    this.movies = {
      x: this.tvShows.x + 140,
      y: this.tvShows.y,
    };

    this.categories = {
      x: this.movies.x + 120,
      y: this.movies.y,
    };

    this.categoriesTriangle = [
      { x: this.categories.x + 100, y: this.categories.y - 10 },
      { x: this.categories.x + 120, y: this.categories.y - 10 },
      {
        x: (this.categories.x + 100 + this.categories.x + 120) / 2,
        y: this.categories.y,
      },
    ];
  }

  draw(ctx) {
    const gradient = ctx.createLinearGradient(
      this.x + 20,
      this.y,
      this.x,
      this.y + this.y + this.height
    );
    gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.05)");
    ctx.fillStyle = gradient;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // component draw
    this.logo.draw(ctx);
    this.castButton.draw(ctx);
    this.profileButton.draw(ctx);

    // text draw
    changeFontSize(ctx, 20);
    ctx.fillText("TV Shows", this.tvShows.x, this.tvShows.y);
    ctx.fillText("Movies", this.movies.x, this.movies.y);
    ctx.fillText("Categories", this.categories.x, this.categories.y);

    // categories triangle draw
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.moveTo(this.categoriesTriangle[0].x, this.categoriesTriangle[0].y);
    for (const item of this.categoriesTriangle) {
      ctx.lineTo(item.x, item.y);
    }
    ctx.lineTo(this.categoriesTriangle[0].x, this.categoriesTriangle[0].y);
    ctx.fill();
    ctx.closePath();
  }
}

class SearchPage {}

class CommingSoonPage {}

class HomePage {
  constructor() {}

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.header = new NetflixHeader(
      0,
      0,
      this.stageWidth,
      this.stageHeight / 7
    );

    this.bottomNavigation = new BottomNavigation(
      0,
      this.stageHeight - 70,
      this.stageWidth,
      70
    );
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    const homeSplash = new Image();
    homeSplash.src = "./assets/homeSplash.jfif";

    homeSplash.onload = () => {
      ctx.drawImage(homeSplash, 0, 0, this.stageWidth, this.stageHeight * 0.7);
      this.header.draw(ctx);
      this.bottomNavigation.draw(ctx);
    };
  }
}

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    this.currentPage = 0;

    this.pages = [];
    this.pages.push(new HomePage());

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.stageWidth = 500;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.ctx.scale(1, 1);

    this.pages[this.currentPage].resize(this.stageWidth, this.stageHeight);

    this.draw();
  }

  draw() {
    this.pages[this.currentPage].draw(this.ctx);
  }
}

window.onload = () => {
  new App();
};
