export default {
    data() {
        return {
            listType: [
                "review_content_collection_food",
                "review_content_collection_place",
                "review_content_collection_collection",
                "review_place",
                "review_post",
                "review_article",
                "delivery_store",
                "delivery_collection",
                "voucher_product",
                "event_day_checking",
                "event_review_champion",
                "client_menu_tab",
                "mission_quest",
                "review_user_tag"
            ],
            ObjectModel: {
                review_content_collection_food: "review_content_collection",
                review_content_collection_place: "review_content_collection",
                review_content_collection_collection: "review_content_collection",
                review_place: "review_place",
                review_post: "review_post",
                review_article: "review_post",
                delivery_store: "delivery_store",
                delivery_collection: "delivery_collection",
                voucher_product: "voucher_product",
                client_menu_tab: "client_menu_tab",
                mission_quest: "review_service",
                review_user_tag: "review_topic_tag"
            }
        }
    },
    filters: {
        ObjectTypeFilter(val) {
            let type = {
                review_content_collection_food: "Bộ sưu tập Food",
                review_content_collection_place: "Bộ sưu tập địa điểm",
                review_content_collection_collection: "Bộ sưu tập",
                review_place: "Địa điểm",
                review_post: "Bài viết",
                review_article: "Bài tin tức",
                delivery_store: "Cửa hàng deli",
                delivery_collection: "Bộ sưu tập deli",
                voucher_product: "Sản phẩm e-voucher",
                event_day_checking: "event day checking",
                event_review_champion: "event review champion",
                client_menu_tab: "Banner tab app",
                mission_quest: "Banner event quest",
                review_user_tag: "User tag"
            };
            return type[val];
        }
    }
}