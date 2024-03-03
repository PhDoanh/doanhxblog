import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Tiêu đề không tên",
    description: "Chưa có mô tả",
  },
  components: {
    backlinks: {
      title: "Liên kết từ các bài viết khác",
      noBacklinksFound: "Không có",
    },
    themeToggle: {
      lightMode: "Nền sáng",
      darkMode: "Nền tối",
    },
    explorer: {
      title: "Chủ đề",
    },
    footer: {
      createdWith: "Được tạo bởi",
    },
    graph: {
      title: "Liên kết với các bài viết khác",
    },
    recentNotes: {
      title: "Các bài viết gần đây",
      seeRemainingMore: ({ remaining }) => `Xem thêm ${remaining} bài viết khác →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Transclude of ${targetSlug}`,
      linkToOriginal: "Link to original",
    },
    search: {
      title: "Tìm kiếm",
      searchBarPlaceholder: "Thử gõ \"cốc\"",
    },
    tableOfContents: {
      title: "Mục lục",
    },
  },
  pages: {
    rss: {
      recentNotes: "Các bài viết gần đây",
      lastFewNotes: ({ count }) => `Còn ${count} bài viết cuối`,
    },
    error: {
      title: "Trang hiện không khả dụng",
      notFound: "Nội dụng của trang riêng tư hoặc không tồn tại.",
    },
    folderContent: {
      folder: "Chủ đề",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 bài viết liên quan" : `${count} bài viết liên quan.`,
    },
    tagContent: {
      tag: "Thẻ",
      tagIndex: "Danh sách thẻ",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 bài viết liên quan" : `${count} bài viết liên quan.`,
      showingFirst: ({ count }) => `Hiển thị ${count} thẻ đầu tiên.`,
      totalTags: ({ count }) => `Tổng cộng ${count} thẻ được tìm thấy.`,
    },
  },
} as const satisfies Translation
