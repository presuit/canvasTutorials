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
    this.wifiWidth = this.width / 1.5;
    this.wifiGap = this.wifiWidth / 4;
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

    ctx.strokeStyle = "white";
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

class CommingSoonButton {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.squareWidth = this.width;
    this.squareHeight = this.height;

    this.centerX = this.x + 0.5 * this.width;
    this.centerY = this.y + 0.5 * this.height;

    this.firstSquare = {
      x: this.centerX - this.squareWidth / 2,
      y: this.centerY - this.squareHeight / 2,
    };

    this.secondSquare = {
      x: this.firstSquare.x - 8,
      y: this.firstSquare.y - 8,
    };

    this.playBtn = [
      {
        x: this.firstSquare.x + 0.4 * this.squareWidth,
        y: this.firstSquare.y + this.squareHeight * 0.2,
      },
      {
        x: this.firstSquare.x + 0.4 * this.squareWidth + 10,
        y: this.firstSquare.y + this.squareHeight * 0.5,
      },
      {
        x: this.firstSquare.x + 0.4 * this.squareWidth,
        y: this.firstSquare.y + this.squareHeight * 0.8,
      },
    ];
  }
  draw(ctx) {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";

    ctx.strokeRect(
      this.secondSquare.x,
      this.secondSquare.y,
      this.squareWidth,
      this.squareHeight
    );

    ctx.fillRect(
      this.firstSquare.x,
      this.firstSquare.y,
      this.squareWidth,
      this.squareHeight
    );

    ctx.strokeRect(
      this.firstSquare.x,
      this.firstSquare.y,
      this.squareWidth,
      this.squareHeight
    );

    ctx.beginPath();
    ctx.moveTo(this.playBtn[0].x, this.playBtn[0].y);
    for (const point of this.playBtn) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.lineTo(this.playBtn[0].x, this.playBtn[0].y);
    ctx.stroke();
    ctx.closePath();
  }
}

class SearchButton {
  constructor(x, y, width, height, fillStyle, strokeStyle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fillStyle = fillStyle;
    this.strokeStyle = strokeStyle;

    this.centerX = this.x + this.width * 0.5;
    this.centerY = this.y + this.height * 0.5;
  }

  draw(ctx) {
    ctx.strokeStyle = this.strokeStyle || "white";
    ctx.beginPath();
    ctx.moveTo(this.x + this.width, this.y + this.height);
    ctx.lineTo(this.centerX, this.centerY);
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = this.fillStyle || "black";
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.width * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.width * 0.4, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }
}

class DownloadsButton {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.centerX = this.x + this.width * 0.5;
    this.centerY = this.y + this.height * 0.5;

    this.bar = [
      { x: this.x, y: this.y + this.height * 0.9 },
      { x: this.x + this.width, y: this.y + this.height * 0.9 },
    ];

    this.arrow = [
      { x: this.centerX, y: this.y },
      { x: this.centerX, y: this.y + this.height * 0.8 },
      { x: this.centerX - 15, y: this.y + this.height * 0.5 },
      { x: this.centerX, y: this.y + this.height * 0.8 },
      { x: this.centerX + 15, y: this.y + this.height * 0.5 },
    ];
  }

  draw(ctx) {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.bar[0].x, this.bar[0].y);
    for (const item of this.bar) {
      ctx.lineTo(item.x, item.y);
    }
    ctx.lineTo(this.bar[0].x, this.bar[0].y);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(this.arrow[0].x, this.arrow[0].y);
    for (const item of this.arrow) {
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

    this.homeButton = new HomeButton(
      this.x + this.width * 0.1,
      this.y + this.height * 0.3,
      30,
      30
    );
    this.commingSoonButton = new CommingSoonButton(
      this.homeButton.x + this.homeButton.width + 100,
      this.homeButton.y + 10,
      25,
      25
    );
    this.searchButton = new SearchButton(
      this.commingSoonButton.x + this.commingSoonButton.width + 100,
      this.homeButton.y + this.height * 0.05,
      30,
      30
    );

    this.downloadsButton = new DownloadsButton(
      this.searchButton.x + this.searchButton.width + 100,
      this.homeButton.y + 8,
      30,
      30
    );
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.homeButton.draw(ctx);
    ctx.fillStyle = "white";
    changeFontSize(ctx, 12);

    ctx.fillText("Home", this.homeButton.x, this.y + this.height * 0.9);

    this.commingSoonButton.draw(ctx);
    ctx.fillStyle = "white";
    ctx.fillText(
      "Comming Soon",
      this.commingSoonButton.x - 30,
      this.y + this.height * 0.9
    );

    this.searchButton.draw(ctx);
    ctx.fillStyle = "white";
    ctx.fillText("Search", this.searchButton.x, this.y + this.height * 0.9);

    this.downloadsButton.draw(ctx);
    ctx.fillStyle = "white";
    ctx.fillText(
      "Downloads",
      this.downloadsButton.x - 10,
      this.y + this.height * 0.9
    );
  }
}

class NetflixMovie {
  constructor(x, y, width, height, imgSrc) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.imgSrc = imgSrc;
  }

  draw(ctx) {
    const img = new Image();
    img.src = `./assets/${this.imgSrc}.PNG`;

    img.onload = () => {
      ctx.drawImage(img, this.x, this.y, this.width, this.height);
    };
  }
}

class NetflixMovieContainer {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.movieWidth = this.width / 4;
    this.movieHeight = this.height;

    this.totalMovies = 4;

    this.movies = [];
    for (let i = 0; i < this.totalMovies; i++) {
      this.movies.push(
        new NetflixMovie(
          this.x + this.movieWidth * i + 20 * i + 10,
          this.y,
          this.movieWidth,
          this.movieHeight,
          `movie_${i + 1}`
        )
      );
    }
  }

  draw(ctx) {
    for (const item of this.movies) {
      item.draw(ctx);
    }
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

    this.centerX = this.x + this.width * 0.5;
    this.centerY = this.y + this.height * 0.5;

    this.logo = new NetflixLogo(
      this.x + 20,
      this.y + 20,
      this.elementBaseWidth - 10,
      this.elementBaseHeight - 5
    );

    this.castButton = new NetflixCastButton(
      this.centerX + this.width * 0.3,
      this.centerY - this.height * 0.25,
      this.width * 0.06,
      this.height * 0.2
    );

    this.profileButton = new NetflixProfileIcon(
      this.centerX + this.width * 0.4,
      this.centerY - this.height * 0.25,
      this.width * 0.05,
      this.height * 0.2
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

class PlusButton {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.centerX = this.x + this.width * 0.5;
    this.centerY = this.y + this.height * 0.5;

    this.points = [];
    this.points.push({ x: this.centerX, y: this.y });
    this.points.push({ x: this.centerX, y: this.y + this.height });
    this.points.push({ x: this.x, y: this.centerY });
    this.points.push({ x: this.x + this.width, y: this.centerY });
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    ctx.lineTo(this.points[1].x, this.points[1].y);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(this.points[2].x, this.points[2].y);
    ctx.lineTo(this.points[3].x, this.points[3].y);
    ctx.stroke();
    ctx.closePath();
  }
}

class PlayButton {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.centerX = this.x + this.width * 0.5;
    this.centerY = this.y + this.height * 0.5;

    this.triangle = [];

    this.triangle.push({
      x: this.x + this.width * 0.2,
      y: this.y + this.height * 0.2,
    });
    this.triangle.push({
      x: this.x + this.width * 0.35,
      y: this.y + this.height * 0.5,
    });
    this.triangle.push({
      x: this.x + this.width * 0.2,
      y: this.y + this.height * 0.8,
    });
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(this.triangle[0].x, this.triangle[0].y);
    for (const item of this.triangle) {
      ctx.lineTo(item.x, item.y);
    }
    ctx.lineTo(this.triangle[0].x, this.triangle[0].y);
    ctx.fill();
    ctx.closePath();

    ctx.font = "bold 18px sans-serif";
    ctx.fillText("Play", this.triangle[1].x + 10, this.triangle[1].y + 5);
  }
}

class InfoButton {
  constructor(x, y, width, height, fontSize) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fontSize = fontSize;

    this.centerX = this.x + this.width * 0.5;
    this.centerY = this.y + this.height * 0.5;
  }

  draw(ctx) {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.width / 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "white";
    ctx.font = `bold ${this.fontSize}px sans-serif`;
    ctx.fillText(
      "i",
      this.centerX - this.width * 0.1,
      this.centerY + this.height * 0.2
    );
    changeFontSize(ctx, 12);
  }
}

class TopTenBadge {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.centerX = this.x + this.width * 0.5;
    this.centerY = this.y + this.height * 0.5;
  }

  draw(ctx) {
    ctx.fillStyle = "firebrick";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 15px sans-serif";
    ctx.fillText("TOP", this.centerX - this.width * 0.35, this.centerY);
    ctx.fillText(
      "10",
      this.centerX - this.width * 0.2,
      this.centerY + this.height * 0.3
    );
  }
}

class BellIcon {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.centerX = this.x + this.width * 0.5;
    this.centerY = this.y + this.height * 0.5;

    this.bellCurve = [
      { x: this.x + this.width * 0.1, y: this.y + this.height * 0.8 },
      { x: this.x + this.width * 0.1, y: this.y },
      { x: this.x + this.width * 0.9, y: this.y },
      { x: this.x + this.width * 0.9, y: this.y + this.height * 0.8 },
    ];
  }
  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height * 0.8);
    ctx.lineTo(this.x + this.width, this.y + this.height * 0.8);
    ctx.stroke();
    ctx.closePath();

    ctx.arc(
      this.centerX,
      this.y + this.height * 0.8,
      this.width * 0.15,
      0,
      Math.PI
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.bellCurve[0].x, this.bellCurve[0].y);
    ctx.bezierCurveTo(
      this.bellCurve[1].x,
      this.bellCurve[1].y,
      this.bellCurve[2].x,
      this.bellCurve[2].y,
      this.bellCurve[3].x,
      this.bellCurve[3].y
    );
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(this.centerX, this.y);
    ctx.lineTo(this.centerX, this.y + this.height * 0.2);
    ctx.stroke();
    ctx.closePath();
  }
}

class CommingSoonMovie {
  constructor(
    x,
    y,
    width,
    height,
    commingDate,
    description,
    genres,
    imgSrc,
    titleSrc
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.commingDate = commingDate;
    this.description = description;
    this.genres = genres;
    this.imgSrc = imgSrc;
    this.titleSrc = titleSrc;

    this.centerX = this.x + this.width * 0.5;
    this.centerY = this.y + this.height * 0.5;

    this.bellIcon = new BellIcon(
      this.centerX + this.width * 0.2,
      this.centerY + this.height * 0.05,
      this.width * 0.06,
      this.height * 0.07
    );

    this.infoIcon = new InfoButton(
      this.bellIcon.x + this.width * 0.15,
      this.bellIcon.y,
      this.width * 0.05,
      this.height * 0.06,
      12
    );
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    const movieImg = new Image();
    movieImg.src = this.imgSrc;

    movieImg.onload = () => {
      ctx.drawImage(movieImg, this.x, this.y, this.width, this.height * 0.5);

      const movieTitle = new Image();
      movieTitle.src = this.titleSrc;
      movieTitle.onload = () => {
        ctx.drawImage(
          movieTitle,
          this.x,
          this.y + this.height * 0.5,
          this.width * 0.3,
          this.height * 0.2
        );
      };
    };

    this.bellIcon.draw(ctx);
    ctx.fillStyle = "white";
    changeFontSize(ctx, 12);
    ctx.fillText(
      "Remind Me",
      this.bellIcon.x - 15,
      this.bellIcon.y + this.bellIcon.height + 16
    );

    this.infoIcon.draw(ctx);
    ctx.fillText(
      "Info",
      this.infoIcon.x,
      this.infoIcon.y + this.infoIcon.height + 20
    );

    ctx.fillText(
      `Seasons Comming ${this.commingDate}`,
      this.x + 10,
      this.centerY + this.height * 0.24
    );

    for (let i = 0; i < this.description.length; i++) {
      ctx.fillText(
        this.description[i],
        this.x + 10,
        this.centerY + this.height * 0.3 + i * 15
      );
    }

    let futherToGo = this.x + 10;
    let text;
    for (let i = 0; i < this.genres.length; i++) {
      text = ctx.measureText(this.genres[i]);
      ctx.fillText(
        this.genres[i],
        i > 0 ? futherToGo : this.x + 10,
        this.centerY + this.height * 0.3 + this.description.length * 15 + 20
      );
      futherToGo += text.width + 20;

      if (i < this.genres.length - 1) {
        ctx.fillStyle = "firebrick";
        ctx.beginPath();
        ctx.arc(
          futherToGo - 10,
          this.centerY + this.height * 0.3 + this.description.length * 15 + 15,
          3,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = "white";
      }
    }

    return Promise.resolve(true);
  }
}

class NetflixCommingSoonHeader {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.centerX = this.x + this.width * 0.5;
    this.centerY = this.y + this.height * 0.5;

    this.castButton = new NetflixCastButton(
      this.centerX + this.width * 0.2,
      this.centerY - this.height * 0.15,
      this.width * 0.05,
      this.height * 0.2
    );

    this.profileButton = new NetflixProfileIcon(
      this.castButton.x + this.width * 0.12,
      this.centerY - this.height * 0.15,
      this.width * 0.05,
      this.height * 0.2
    );

    this.bellIcon = new BellIcon(
      this.x + this.width * 0.1,
      this.centerY + this.height * 0.25,
      this.width * 0.04,
      this.height * 0.2
    );

    this.arrow = [
      { x: this.x + this.width * 0.9, y: this.bellIcon.y },
      {
        x: this.x + this.width * 0.93,
        y: this.bellIcon.y + this.bellIcon.height * 0.5,
      },
      {
        x: this.x + this.width * 0.9,
        y: this.bellIcon.y + this.bellIcon.height * 0.5 * 2,
      },
    ];
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 25px sans-serif";
    ctx.fillText("Comming Soon", this.x + this.width * 0.05, this.centerY);
    this.profileButton.draw(ctx);
    this.castButton.draw(ctx);

    this.bellIcon.draw(ctx);
    ctx.fillStyle = "white";
    changeFontSize(ctx, 20);
    ctx.fillText(
      "Notifications",
      this.bellIcon.x + this.bellIcon.width + this.width * 0.1,
      this.bellIcon.y + this.bellIcon.height - this.height * 0.03
    );

    ctx.beginPath();
    ctx.moveTo(this.arrow[0].x, this.arrow[0].y);
    for (const item of this.arrow) {
      ctx.lineTo(item.x, item.y);
    }
    ctx.stroke();
    ctx.closePath();
  }
}

class SearchBar {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.centerX = this.x + this.width * 0.5;
    this.centerY = this.y + this.height * 0.5;

    this.searchIcon = new SearchButton(
      this.centerX - 50,
      this.y + 5,
      25,
      25,
      "#27272A",
      "#71717A"
    );
  }

  draw(ctx) {
    ctx.fillStyle = "#27272A";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.lineWidth = 3;
    this.searchIcon.draw(ctx);

    ctx.fillStyle = "#71717A";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(
      "Search",
      this.searchIcon.x + this.searchIcon.width + 15,
      this.searchIcon.y + this.searchIcon.height - 5
    );
  }
}

class PlayIcon {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.centerX = this.x + this.width * 0.5;
    this.centerY = this.y + this.height * 0.5;

    this.triangles = [];
    this.triangles.push({
      x: this.centerX - this.width * 0.15,
      y: this.y + this.height * 0.2,
    });
    this.triangles.push({
      x: this.x + this.width * 0.8,
      y: this.centerY,
    });
    this.triangles.push({
      x: this.centerX - this.width * 0.15,
      y: this.y + this.height * 0.8,
    });
  }

  draw(ctx) {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.width * 0.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(this.triangles[0].x, this.triangles[0].y);
    for (const item of this.triangles) {
      ctx.lineTo(item.x, item.y);
    }
    ctx.lineTo(this.triangles[0].x, this.triangles[0].y);
    ctx.fill();
    ctx.closePath();
  }
}

class SearchMovie {
  constructor(x, y, width, height, imgSrc, title) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.imgSrc = imgSrc;
    this.title = title;

    this.centerX = this.x + this.width * 0.5;
    this.centerY = this.y + this.height * 0.5;

    this.playIconWidth = 40;

    this.playIcon = new PlayIcon(
      this.x + this.width * 0.85,
      this.centerY - this.playIconWidth / 2,
      this.playIconWidth,
      this.playIconWidth
    );
  }

  draw(ctx) {
    const img = new Image();
    img.src = this.imgSrc;

    img.onload = () => {
      ctx.drawImage(img, this.x, this.y, this.width * 0.3, this.height);
      ctx.fillStyle = "white";
      ctx.font = "bold 15px sans-serif";
      ctx.fillText(
        this.title,
        this.x + this.width * 0.32,
        this.y + this.height * 0.5
      );
      this.playIcon.draw(ctx);
    };
  }
}

class SearchPage {
  constructor() {}

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.totalMovies = 5;
    this.movieTitles = [
      "Fomula 1:Drive to Survive",
      "League of Legends Origins",
      "Lupin",
      "Sherlock",
      "The Queen's Gambit",
    ];

    this.searchBar = new SearchBar(
      10,
      10,
      this.stageWidth - 20,
      this.stageHeight * 0.05
    );

    this.bottomNavigation = new BottomNavigation(
      0,
      this.stageHeight * 0.9,
      this.stageWidth,
      this.stageHeight * 0.1
    );

    this.movies = [];

    for (let i = 0; i < this.totalMovies; i++) {
      if (i === 0) {
        this.movies.push(
          new SearchMovie(
            this.searchBar.x,
            this.searchBar.y + this.searchBar.height + 20,
            this.stageWidth * 0.95,
            this.stageHeight * 0.15,
            `./assets/search_movie_${i + 1}.PNG`,
            this.movieTitles[i]
          )
        );
        continue;
      }

      this.movies.push(
        new SearchMovie(
          this.movies[i - 1].x,
          this.movies[i - 1].y + this.movies[i - 1].height + 20,
          this.stageWidth * 0.95,
          this.stageHeight * 0.15,
          `./assets/search_movie_${i + 1}.PNG`,
          this.movieTitles[i]
        )
      );
    }
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    this.searchBar.draw(ctx);

    ctx.fillStyle = "white";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(
      "Top Searches",
      this.searchBar.x,
      this.searchBar.y + this.searchBar.height + 50
    );

    for (const item of this.movies) {
      item.draw(ctx);
    }

    setTimeout(() => this.bottomNavigation.draw(ctx), 50);
  }
}

class CommingSoonPage {
  constructor() {}

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.header = new NetflixCommingSoonHeader(
      0,
      0,
      this.stageWidth,
      this.stageHeight * 0.15
    );

    this.bottomNavigation = new BottomNavigation(
      0,
      this.stageHeight * 0.9,
      this.stageWidth,
      this.stageHeight * 0.1
    );

    this.movies = [];
    this.movies.push(
      new CommingSoonMovie(
        0,
        this.header.y + this.header.height + 5,
        this.stageWidth,
        this.stageHeight * 0.5,
        "March 31",
        [
          `Joseph Joestar's grandson Jotaro Kujo has a strange new superpower,`,
          `which turns out to be connected to the reemergence of old foe Dio Brando`,
        ],
        ["Exciting", "Fanstasy Anime", "Action Anime", "Ensemble", "Vampires"],
        "./assets/comming_soon_movie_1.PNG",
        "./assets/comming_soon_movie_1_title.PNG"
      )
    );
    this.movies.push(
      new CommingSoonMovie(
        0,
        this.movies[0].y + this.movies[0].height + this.stageHeight * 0.01,
        this.stageWidth,
        this.stageHeight * 0.5,
        "March 31",
        [
          `Joseph Joestar's grandson Jotaro Kujo has a strange new superpower,`,
          `which turns out to be connected to the reemergence of old foe Dio Brando`,
        ],
        ["Exciting", "Fanstasy Anime", "Action Anime", "Ensemble", "Vampires"],
        "./assets/comming_soon_movie_2.PNG",
        "./assets/comming_soon_movie_1_title.PNG"
      )
    );
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

    this.header.draw(ctx);

    for (const item of this.movies) {
      item.draw(ctx);
    }

    setTimeout(() => {
      this.bottomNavigation.draw(ctx);
    }, 50);
  }
}

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
      this.stageHeight * 0.9,
      this.stageWidth,
      this.stageHeight * 0.1
    );

    this.movieContainer = new NetflixMovieContainer(
      0,
      this.stageHeight * 0.725,
      this.stageWidth,
      this.stageHeight * 0.2
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

      const gradient = ctx.createLinearGradient(
        0,
        this.stageHeight * 0.55,
        0,
        this.stageHeight * 0.35
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
      ctx.fillStyle = gradient;
      ctx.fillRect(
        0,
        this.stageHeight * 0.35,
        this.stageWidth,
        this.stageHeight * 0.2
      );
      ctx.fillStyle = "black";
      ctx.fillRect(
        0,
        this.stageHeight * 0.45,
        this.stageWidth,
        this.stageHeight * 0.25
      );

      ctx.fillStyle = "white";
      ctx.font = "100px Grenze Gotisch";
      ctx.fillText("VINCENZO", this.stageWidth * 0.1, this.stageHeight * 0.5);

      const toptenBadge = new TopTenBadge(
        this.stageWidth * 0.2,
        this.stageHeight * 0.52,
        40,
        40
      );
      toptenBadge.draw(ctx);

      changeFontSize(ctx, 20);
      ctx.fillText(
        "#1 in South Korea Today",
        this.stageWidth * 0.3,
        this.stageHeight * 0.55
      );

      const plusButton = new PlusButton(
        this.stageWidth * 0.2,
        this.stageHeight * 0.6,
        25,
        25
      );
      plusButton.draw(ctx);
      changeFontSize(ctx, 15);
      ctx.fillText(
        "My List",
        plusButton.x - 10,
        plusButton.y + plusButton.height + 20
      );

      const playButton = new PlayButton(
        this.stageWidth * 0.4,
        this.stageHeight * 0.6,
        120,
        40
      );

      playButton.draw(ctx);

      const infoButton = new InfoButton(
        this.stageWidth * 0.75,
        this.stageHeight * 0.6 - 5,
        40,
        40,
        30
      );

      infoButton.draw(ctx);
      changeFontSize(ctx, 15);
      ctx.fillText(
        "Info",
        infoButton.x + 7,
        infoButton.y + infoButton.height + 20
      );
    };
    ctx.lineWidth = 3;
    this.bottomNavigation.draw(ctx);
    changeFontSize(ctx, 20);
    ctx.fillStyle = "white";
    ctx.fillText("Anime", 10, this.stageHeight * 0.72);
    this.movieContainer.draw(ctx);
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
    this.pages.push(new CommingSoonPage());
    this.pages.push(new SearchPage());

    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    this.canvas.addEventListener("click", this.handleClick.bind(this));
  }

  handleClick(e) {
    const { clientX: x, clientY: y } = e;

    for (const iconName in this.bottomNavigationOffset) {
      const currentIconName = this.bottomNavigationOffset[iconName];
      const offset1 = currentIconName[0];
      const offset2 = currentIconName[1];

      if (
        x >= offset1.x &&
        x <= offset2.x &&
        y >= offset1.y &&
        y <= offset2.y
      ) {
        if (iconName === "home") {
          // go to home page
          this.currentPage = 0;
        } else if (iconName === "commingSoon") {
          //
          this.currentPage = 1;
        } else if (iconName === "search") {
          this.currentPage = 2;
        }

        this.resize();
      }
    }
  }

  resize() {
    this.stageWidth = 500;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.ctx.scale(1, 1);

    this.pages[this.currentPage].resize(this.stageWidth, this.stageHeight);

    this.bottomNavigationOffset = {
      home: [
        { x: this.canvas.offsetLeft + 44, y: this.stageHeight - 60 },
        { x: this.canvas.offsetLeft + 81, y: this.stageHeight },
      ],
      commingSoon: [
        { x: this.canvas.offsetLeft + 150, y: this.stageHeight - 60 },
        { x: this.canvas.offsetLeft + 234, y: this.stageHeight },
      ],
      search: [
        { x: this.canvas.offsetLeft + 301, y: this.stageHeight - 60 },
        { x: this.canvas.offsetLeft + 341, y: this.stageHeight },
      ],
    };

    this.draw();
  }

  draw() {
    this.pages[this.currentPage].draw(this.ctx);
  }
}

window.onload = () => {
  new App();
};
