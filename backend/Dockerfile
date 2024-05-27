# python:3.8の公式 image をベースの image として設定
FROM python:3.11

# 作業ディレクトリの作成
RUN mkdir /backend

# 作業ディレクトリの設定（以後の RUN は WORKDIR で実行）
WORKDIR /backend

# カレントディレクトリにある資産をコンテナ上の指定のディレクトリにコピーする
ADD web /backend

# pipでrequirements.txtに指定されているパッケージを追加する
RUN pip install -r requirements.txt