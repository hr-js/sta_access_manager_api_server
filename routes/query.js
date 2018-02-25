class Query {
  constructor(build) {
    this.index = build.index;
    this.type = build.type;
    this.body = build.body;
    if (!build.id) {
      this.id = build.id;
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.body = {};
      }
      withIndex(index){
        this.index = index;
        return this;
      }
      withType(type){
        this.type = type;
        return this;
      }
      withId(id) {
        this.id = id;
        return this;
      }
      withBody(body){
        this.body = body;
        return this;
      }
      withQuery(query) {
        this.body.query = query;
        return this;
      }
      withScript(script) {
        this.body.script = script;
        return this;
      }
      build() {
        let query = new Query(this);
        this.body = {};
        return query;
      }
    }
    return Builder;
  }
}

module.exports = Query;
