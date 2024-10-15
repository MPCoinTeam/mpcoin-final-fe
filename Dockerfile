FROM reactnativecommunity/react-native-android:2.1
# set locale to utf8 for fastlane
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
# install bundler
RUN gem install bundler
RUN bundle install
RUN useradd -ms /bin/bash reactnative
# transfer ownership of $ANDROID_HOME (opt/android) so our new user can install additional sdk or build tools at build time. This is needed if you use libraries that target other Android SDK's.
RUN chown reactnative:reactnative $ANDROID_HOME -R
USER reactnative
WORKDIR /home/reactnative
CMD ["bundle", "exec", "fastlane", "build_android"]