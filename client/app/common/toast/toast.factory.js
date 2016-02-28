let ToastFactory = function ($mdToast) {
  "ngInject";
  let show = (content, opts) => {
    opts = opts || {};
    opts.delay = _.isNumber(opts.delay) ? opts.delay : 4000;
    var toast = $mdToast.simple()
      .content(content)
      .hideDelay(opts.delay);
    if (opts.action) {
      toast.action(opts.action);
      toast.highlightAction(true);
    }
    return $mdToast.show(toast);
  };

  let update = (content) => {
    $mdToast.updateContent(content);
  };

  let hide = () => {
    $mdToast.hide();
  };

  return {
    show,
    update,
    hide
  };
};

export default ToastFactory;

