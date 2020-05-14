<template>
  <no-ssr>
    <div class="portlet panel panel-border panel-warning">
      <a
        class="portlet-heading bg-default panel-heading"
        style="background: #f3f3f3; display: block;"
        data-toggle="collapse"
        data-parent="#accordion1"
        :href="`#${target}`"
        aria-expanded="false"
        @click="collapseState"
      >
        <h3
          class="portlet-title text-inverse"
          style="margin: 0; line-height: 30px;"
        >Tiêu chí lọc ( {{Object.keys(filter).filter(key => filter[key].isValued).length | number}} )</h3>

        <div class="portlet-widgets">
          <a id="minus" class>
            <i class="ion-minus-round"></i>
          </a>
        </div>
        <div class="clearfix"></div>
      </a>
      <div
        class="filter-list display-flex align-items"
        v-if="(Object.keys(filter).filter(key => filter[key].isValued).length) > 0"
      >
        <div
          :key="`item-${index}`"
          v-for="(item, name, index) in filter"
          style="margin-bottom: 12px;"
        >
          <p v-if="item.isValued" class="label label-inverse m-b-5 filter-item">
            <span>{{item.title}}: {{item.display}}</span>
            <i style="margin-left: 4px;" class="mdi mdi-close" @click="removeFilter(name)"></i>
          </p>
        </div>
      </div>
      <div class="clearfix"></div>

      <div :id="target" class="panel-collapse collapse" aria-expanded="false">
        <div class="portlet-body">
          <slot></slot>
          <div class="form-group col-sm-12 text-right">
            <button
              type="button"
              @click="submit"
              class="btn btn-rounded btn-success waves-effect waves-light"
            >
              <i class="ti ti-filter"></i> Lọc
              <i v-if="isLoading" class="fa fa-spinner fa-spin"></i>
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </no-ssr>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "FilterPanel",

  props: {
    value: null,
    target: {
      type: String,
      default: "collapsePanel"
    }
  },
  filters: {
    number(value) {
      return Intl.NumberFormat().format(value);
    }
  },
  data: () => ({
    filter: {},
    isLoading: false,
    isShowFilter: false
  }),
  mounted() {
    setTimeout(() => {
      this.reload();
    }, 1000);
  },
  methods: {
    reset: function() {
      for (let key in this.value) {
        if (key === "$meta") continue;
        this.value[key].value = this.filter[key].value;
      }
    },

    reload: async function() {
      let oldFilter = this.filter;

      this.filter = {};

      for (let key in this.value) {
        if (key == "page" || key == "page_size") {
          continue;
        }
        let field = this.value[key];
        let filter = {
          value: field.value,
          title: field.title
        };

        if (Array.isArray(filter.value) && filter.value.length === 0)
          filter.isValued = false;
        else
          filter.isValued =
            filter.value !== undefined &&
            filter.value !== null &&
            filter.value !== "";

        if (!filter.isValued) filter.display = null;
        else if (field.display)
          filter.display = field.display.bind(this)(filter.value);
        else if (field.labelType) {
          if (Array.isArray(field.labelType))
            filter.display = this.$filter[field.labelType[0]](
              filter.value,
              ...field.labelType.slice(1)
            );
          else 
            filter.display = filter.value[field.labelType];
          
        } else if (field.value.name) {
          filter.display = filter.value.name;
        } else filter.display = filter.value;

        this.filter[key] = filter;
      }
    },

    removeFilter: async function(value) {
      this.value[value].value = null;
      this.reload();
      await this.$emit("submit");
    },

    submit: async function() {
      let oldFilter = this.filter;
      this.filter = {};
      for (let key in this.value) {
        if (key == "page" || key == "page_size") {
          continue;
        }
        let field = this.value[key];
        if (field) {
          let filter = {
            value: field.value,
            title: field.title
          };
          if (Array.isArray(filter.value) && filter.value.length === 0)
            filter.isValued = false;
          else
            filter.isValued =
              filter.value !== undefined &&
              filter.value !== null &&
              filter.value !== "";

          if (!filter.isValued) filter.display = null;
          else if (field.display)
            filter.display = field.display.bind(this)(filter.value);
          else if (field.labelType) {
            if (Array.isArray(field.labelType))
              filter.display = this.$filter[field.labelType[0]](
                filter.value,
                ...field.labelType.slice(1)
              );
            else filter.display = filter.value[field.labelType];
            // filter.display = this.$filter[field.labelType](filter.value);
          } else if (field.value.name) {
            filter.display = filter.value.name;
          } else filter.display = filter.value;

          this.filter[key] = filter;
        }
      }

      let isChanged = false;
      if (Object.keys(oldFilter).length !== Object.keys(this.filter).length)
        isChanged = true;
      else {
        for (let key in oldFilter) {
          let oldField = oldFilter[key];
          let newField = this.filter[key];

          if (newField === undefined || oldField.value !== newField.value) {
            isChanged = true;
            break;
          }
        }
      }
      this.isLoading = true;
      this.$emit(
        "input",
        Object.assign(this.value, { $meta: { isChanged: isChanged } })
      );
      await this.$emit("submit");
      this.$emit(
        "input",
        Object.assign(this.value, { $meta: { isChanged: false } })
      );
      this.isLoading = false;
    },
    collapseState: function() {
      if (!this.isShowFilter) {
        document.getElementById("minus").classList.remove("collapsed");
      } else {
        document.getElementById("minus").classList.add("collapsed");
      }
      this.isShowFilter = !this.isShowFilter;
    }
  },

  loaded: function() {
    if (typeof this.firstLoad === "undefined" || this.firstLoad === true)
      this.submit();
  }
};
</script>

<style lang="scss" scoped>
.filter-list {
  padding: 15px 15px;
  > span {
    float: left;
    margin: 2px;
  }
  .filter-item {
    margin-right: 8px;
    border-radius: 32px;
    padding: 6px 8px 6px 12px;
    i {
      transition: 0.3s all ease-in;
      -moz-transition: 0.3s all ease-in;
      -webkit-transition: 0.3s all ease-in;
      &:hover {
        //  color: rgba(24, 138, 226, 0.5);
        cursor: pointer;
      }
    }
  }
}
.fa-plus:before {
  content: "\F067";
}
</style>