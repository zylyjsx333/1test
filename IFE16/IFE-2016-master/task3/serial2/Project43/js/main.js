var GalleryWall = function(src, photos) {
    this.target = document.querySelector(src);
    this.photos = photos.slice(0, 6);
    this.init();
    this.setSize();
}

GalleryWall.prototype.init = function() {
    this.target.classList.add('gallery-' + this.photos.length);
    this.target.innerHTML = this.photos.reduce(function(html, item) {
        html += 
            '<div class="gallery-item" style="background-image: url(' + item.image.large + ')">' +
                '<div class="gallery-photo-info">' +
                    '<div class="gallery-photo-info-wapper">' +
                        '<div class="gallery-photo-name">' + item.name + '</div>' +
                        '<div class="gallery-photo-description">' + item.description + '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'
        return html;    
    }, '');
}

GalleryWall.prototype.setSize = function() {
    var item = this.target.querySelectorAll(".gallery-item");
    this["size" + this.photos.length]().forEach(function(size, i) {
        item[i].style.width = size.width + 'px';
        item[i].style.height = size.height + 'px';
        if (size.right) {
            item[i].style.float = "right";
        }
    })
}

GalleryWall.prototype.size1 = function() {
    return [
        {
            width: this.target.clientWidth,
            height: this.target.clientHeight
        }
    ];
}

GalleryWall.prototype.size2 = function() {
    var width = this.target.clientWidth * 2 / 3
    
    return [
        {
          width: width,
          height: this.target.clientHeight
        },
        
        {
          width: width,
          height: this.target.clientHeight
        }
    ];
}

GalleryWall.prototype.size3 = function() {
    var length = this.target.clientHeight / 2;
    return [
        {
            width: this.target.clientWidth - length,
            height: this.target.clientHeight
        },
        
        {
            width: length,
            height: length
        },
        
        {
            width: length,
            height: length
        }
    ];
}

GalleryWall.prototype.size4 = function() {
    var width = this.target.clientWidth / 2;
    var height = this.target.clientHeight / 2;
    return [
        {
            width: width,
            height: height
        },
        
        {
            width: width,
            height: height
        },
        
        {
            width: width,
            height: height
        },
        
        {
            width: width,
            height: height
        }
    ];
}

GalleryWall.prototype.size5 = function() {
    var width = this.target.clientWidth / 3;
    var height = this.target.clientHeight / 3;
    var returnObj = [
        {
            width: width * 2,
            height: height * 2
        },
        
        {
            right: true,
            width: width,
            height: width
        },
        
        {
            right: true,
            width: width,
            height: this.target.clientHeight - width
        },
        
        {
            width: width,
            height: height
        },
        
        {
            width: width,
            height: height
        }
    ];
    if (this.target.clientWidth > this.target.clientHeight * 2) {
        returnObj.push(returnObj.splice(2, 1)[0])
    }
  
    return returnObj;
}

GalleryWall.prototype.size6 = function() {
    var width = this.target.clientWidth / 3;
    var height = this.target.clientHeight / 3;
    return [
        {
            width: width * 2,
            height: height * 2
        },
        
        {
            width: width,
            height: height
        },
        
        {
            width: width,
            height: height
        },
        
        {
            width: width,
            height: height
        },
        
        {
            width: width,
            height: height
        },
        
        {
            width: width,
            height: height
        }
    ];
}