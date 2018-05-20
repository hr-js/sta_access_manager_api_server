'use strict';
class ElasticsearchProvider {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }

  prepare() {
    return undefined;
  }

  async register() {
    return {
      statusCode: 0,
      id: '0000001',
      user: {
        mail: 'john.doe@test.jp',
        name: 'John Doe',
      },
    };
  }

  async update() {
    return {
      id: '0000001',
      purpose: 'STUDY',
    };
  }

  async fetchUser() {
    return {
      id: '0000001',
      user: {
        mail: 'john.doe@test.jp',
        name: 'John Doe',
      },
    };

  }
  async check() {
    return {
      id: '0000001',
      user: {
        mail: 'john.doe@test.jp',
      },
    };
  }
  async checkWorkspace() {
    return {
      id: '0000001',
      user: {
        mail: 'john.doe@test.jp',
      },
    };
  }
  async exit() {
    return {
      id: '0000001',
      user: {
        mail: 'john.doe@test.jp',
      },
    };
  }
  async entry() {
    return {
      id: '0000001',
      user: {
        mail: 'john.doe@test.jp',
      },
    };
  }
  async fetchUsersByDate() {
    return {
      id: '0000001',
      user: {
        mail: 'john.doe@test.jp',
      },
    };
  }
}
module.exports = (host, port) => {
  return new ElasticsearchProvider(host, port);
};
