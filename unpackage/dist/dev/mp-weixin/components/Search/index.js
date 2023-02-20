"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "Search",
  data() {
    return {};
  },
  props: {
    classify: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toSearch() {
      common_vendor.index.navigateTo({
        url: "/branch/SearchPage/SearchPage"
      });
    },
    toClassify() {
      common_vendor.index.switchTab({
        url: "/pages/classify/classify"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.toSearch && $options.toSearch(...args)),
    b: $props.classify
  }, $props.classify ? {
    c: common_vendor.o((...args) => $options.toClassify && $options.toClassify(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/\u4E0A\u8BFE\u6587\u4EF6/Class-documents/\u5C0F\u7A0B\u5E8F/\u5C0F\u667A\u89C6\u9891/components/Search/index.vue"]]);
wx.createComponent(Component);
