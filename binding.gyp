{
  "targets": [
    {
      "target_name": "arc4random",
      "sources": [ "arc4random.cc" ],
      "cflags": [ "-Wall" ],
      "include_dirs" : [ "<!(node -e \"require('nan')\")" ],
      "conditions": [
        ['OS=="linux"', {
          'cflags': [
            '<!@(pkg-config --cflags libbsd)'
          ],
          'ldflags': [
            '<!@(pkg-config --libs-only-L --libs-only-other libbsd)'
          ],
          'libraries': [
            '<!@(pkg-config --libs-only-l libbsd)'
          ],
          'defines': [ 'USE_LIBBSD', ]
        }]
      ]
    }
  ]
}
