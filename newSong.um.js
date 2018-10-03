
(macro => (lambda (args body) (return `(lambda ,args (return ,body)))))

(macro stringify
    (=>
        (expr)
        (
            (. this string)
            (
                (. this compileToJs)
                (
                    (. this compile)
                    expr
                )
            )
        )
    )
)

(macro argsArr
    (=>
        ()
        ((. Array prototype slice call) arguments 0)
    )
)

(argsArr "x" "y")