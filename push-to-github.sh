#!/bin/bash

# Script to push code to GitHub
# Usage: ./push-to-github.sh YOUR_TOKEN

if [ -z "$1" ]; then
    echo "❌ يرجى إدخال Personal Access Token"
    echo "الاستخدام: ./push-to-github.sh YOUR_TOKEN"
    echo ""
    echo "لإنشاء Token جديد:"
    echo "1. افتح: https://github.com/settings/tokens/new"
    echo "2. اختر 'repo' scope (كل الخيارات)"
    echo "3. انسخ الـ Token واستخدمه في الأمر"
    exit 1
fi

TOKEN=$1
REPO_URL="https://SalimAboobakar:${TOKEN}@github.com/SalimAboobakar/hamat.git"

echo "🚀 جاري الرفع إلى GitHub..."
git push $REPO_URL main

if [ $? -eq 0 ]; then
    echo "✅ تم الرفع بنجاح!"
    echo "🌐 المستودع: https://github.com/SalimAboobakar/hamat"
else
    echo "❌ فشل الرفع. يرجى التحقق من الـ Token والصلاحيات"
fi

