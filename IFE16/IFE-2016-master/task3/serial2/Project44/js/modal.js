var Modal = function () {
    var that = this;

    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.modal.innerHTML =
        '<div class="spinner">' +
            '<div class="double-bounce1"></div>' +
            '<div class="double-bounce2"></div>' +
        '</div>' +
        '<div class="modal-container"><img class="modal-image"></div>'

    addEvent(this.modal, 'click', function (event) {
        if (event.target == that.modal) {
            that.modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    this.container = this.modal.querySelector('.modal-container');
    this.spinner = this.modal.querySelector('.spinner');

    this.image = this.modal.querySelector('.modal-image')
    addEvent(this.image, 'load', function () {
        that.spinner.style.zIndex = -1;
    })

    document.body.appendChild(this.modal);
}

Modal.prototype.show = function (url, width, height) {
    document.body.style.overflow = 'hidden';
    this.modal.classList.add('active');

    if (this.image.src != url) {
        var imageAspectRatio = width / height;
        var windowAspectRatio = innerWidth / innerHeight;

        if (windowAspectRatio > imageAspectRatio) {
            this.container.style.width = parseInt((innerHeight - 100) * imageAspectRatio) + 'px';
        } 
        else {
            this.container.style.width = (innerWidth - 100) + 'px';
            this.container.style.marginTop = (innerHeight - (innerWidth - 100) / imageAspectRatio) / 2 + 'px';
        }

        this.image.src = url;
        this.spinner.style.zIndex = 1;
  }
}