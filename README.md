users table

|Column|type|Option|
|------|----|------|
|name|string|index: true,null: false,unique: true|
|mail|string|null: false,unique: true|

Association
- has_many :groups,through::group_users
- has_many :group_users
- has_many :messages


groups table

|Column|type|Option|
|------|----|------|
|name|string|index: true,null: false,unique: true|

Association
- has_many :users,through::group_users
- has_many :group_users
- has_many :messages


message table

|Column|type|Option|
|------|----|------|
|body|text|
|image|string|
|group|references|foreign_key: true|
|user|references|foreign_key: true|

Association
- belongs_to :user
- belongs_to :group


group_users table

|Column|type|Option|
|------|----|------|
|group|references|index: true,foreign_key: true,null: false|
|user|references|index: true,foreign_key: true,null: false|

Association
- belongs_to :group
- belongs_to :user